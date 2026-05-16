"use client";

import { useState } from "react";
import { Search, ArrowRight, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMixtapeStore } from "@/store/useMixtapeStore";

export default function SongsPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [addedSong, setAddedSong] = useState("");
  const [loading, setLoading] = useState(false);

  const [shareLink, setShareLink] = useState("");
  const [creating, setCreating] = useState(false);

  const router = useRouter();

  const songs = useMixtapeStore((state) => state.songs);
  const receiver = useMixtapeStore((state) => state.receiver);
  const addSong = useMixtapeStore((state) => state.addSong);

  // ---------------- SEARCH ----------------
  async function searchSongs() {
    if (!query.trim()) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();

      if (!res.ok || !Array.isArray(data)) {
        setResults([]);
        return;
      }

      setResults(data);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  // ---------------- CREATE SHARE LINK ----------------
  async function createMixtape() {
    if (songs.length === 0) return;
  
    try {
      setCreating(true);
  
      const res = await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creator: "user",
          receiver,
          songs,
          note: "made with love ♡",
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok || !data.id) throw new Error("save failed");
  
      // 🔥 IMPORTANT: go to READY PAGE
      router.push(`/ready/${data.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  }

  return (
    <main style={page}>
      {/* TITLE */}
      <h1 style={title}>add songs</h1>

      {/* HEART BAR */}
      <div style={hearts}>
        {[...Array(10)].map((_, i) => (
          <Heart
            key={i}
            size={18}
            fill={i < songs.length ? "#c08497" : "transparent"}
            color={i < songs.length ? "#c08497" : "#cfc7be"}
          />
        ))}
      </div>

      {/* SEARCH */}
      <div style={searchBox}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search songs..."
          style={input}
        />

        <button onClick={searchSongs} style={iconBtn}>
          <Search size={18} />
        </button>

        <button
  onClick={() => router.push("/design")}
  style={iconBtn}
>
  <ArrowRight size={18} />
</button>
      </div>

      {/* LOADING */}
      {loading && <p>searching...</p>}

      {/* RESULTS */}
      <div style={resultsBox}>
        {results.map((song) => (
          <div key={song.url} style={card}>
            <div>
              <p style={songTitle}>{song.title}</p>
              <p style={songArtist}>{song.artist}</p>
            </div>

            <button
              onClick={() => {
                addSong({
                  title: song.title,
                  artist: song.artist,
                  audioUrl: song.url,
                });

                setAddedSong(song.url);
                setTimeout(() => setAddedSong(""), 500);
              }}
              style={addBtn}
            >
              {addedSong === song.url ? "added!" : "add"}
            </button>
          </div>
        ))}
      </div>

      {/* READY BUTTON (ONLY IF NO LINK YET) */}
      {!shareLink && songs.length > 0 && (
        <button onClick={createMixtape} style={readyBtn}>
          {creating ? "creating..." : "ready → generate link"}
        </button>
      )}

      {/* SHARE LINK BOX (FINAL OUTPUT) */}
      {shareLink && (
        <div style={shareBox}>
          <h2>mixtape ready! ✨</h2>

          <p>
            send this to <b>{receiver || "your person"}</b> ♡
          </p>

          <div style={linkBox}>{shareLink}</div>

          <button
            onClick={() =>
              navigator.clipboard.writeText(shareLink)
            }
            style={copyBtn}
          >
            copy link
          </button>
        </div>
      )}
    </main>
  );
}

/* ---------------- STYLES ---------------- */

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f5f3ef",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "80px",
  fontFamily: "Inter",
  gap: "18px",
};

const title: React.CSSProperties = {
  fontSize: "48px",
  fontWeight: 300,
  color: "#43362f",
};

const hearts: React.CSSProperties = {
  display: "flex",
  gap: "10px",
};

const searchBox: React.CSSProperties = {
  display: "flex",
  width: "520px",
  border: "1px solid #9b9188",
  borderRadius: "12px",
  padding: "10px",
  alignItems: "center",
};

const input: React.CSSProperties = {
  flex: 1,
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: "16px",
};

const iconBtn: React.CSSProperties = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
};

const resultsBox: React.CSSProperties = {
  width: "520px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const card: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "14px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.5)",
};

const songTitle: React.CSSProperties = {
  margin: 0,
  fontWeight: 500,
};

const songArtist: React.CSSProperties = {
  margin: 0,
  fontSize: "13px",
  color: "#777",
};

const addBtn: React.CSSProperties = {
  border: "1px solid #999",
  borderRadius: "999px",
  padding: "6px 14px",
  background: "transparent",
  cursor: "pointer",
};

const readyBtn: React.CSSProperties = {
  marginTop: "20px",
  padding: "12px 24px",
  borderRadius: "999px",
  border: "none",
  background: "#1f1f1f",
  color: "white",
  cursor: "pointer",
};

const shareBox: React.CSSProperties = {
  marginTop: "20px",
  textAlign: "center",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  background: "white",
};

const linkBox: React.CSSProperties = {
  marginTop: "10px",
  padding: "10px",
  border: "1px solid #ddd",
  wordBreak: "break-all",
};

const copyBtn: React.CSSProperties = {
  marginTop: "10px",
  padding: "10px 18px",
  borderRadius: "999px",
  border: "none",
  background: "#1f1f1f",
  color: "white",
  cursor: "pointer",
};