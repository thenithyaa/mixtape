"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Cassette from "@/components/Cassette";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

export default function PlayerPage() {
  const { id } = useParams();

  const [data, setData] = useState<any>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  // ---------------- LOAD MIXTAPE ----------------
  useEffect(() => {
    async function loadMixtape() {
      try {
        const res = await fetch(`/api/mixtape/${id}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to load mixtape", err);
      }
    }

    loadMixtape();
  }, [id]);

  if (!data) {
    return (
      <div style={loadingStyle}>
        loading mixtape...
      </div>
    );
  }

  const songs = data.songs || [];

  // ---------------- CONTROLS ----------------
  function nextSong() {
    setIndex((prev) =>
      prev === songs.length - 1 ? 0 : prev + 1
    );
  }

  function prevSong() {
    setIndex((prev) =>
      prev === 0 ? songs.length - 1 : prev - 1
    );
  }

  function togglePlay() {
    setPlaying((p) => !p);
  }

  return (
    <main style={page}>
      {/* CASSETTE */}
      <Cassette playing={playing} />

      {/* SONG INFO */}
      {songs[index] && (
        <div style={{ textAlign: "center" }}>
          <h2 style={title}>{songs[index].title}</h2>
          <p style={artist}>{songs[index].artist}</p>
        </div>
      )}

      {/* CONTROLS */}
      <div style={controls}>
        <button onClick={prevSong} style={btn}>
          <SkipBack size={22} />
        </button>

        <button onClick={togglePlay} style={playBtn}>
          {playing ? (
            <Pause size={28} />
          ) : (
            <Play size={28} />
          )}
        </button>

        <button onClick={nextSong} style={btn}>
          <SkipForward size={22} />
        </button>
      </div>

      {/* AUDIO (FIXED — NO REACTPLAYER) */}
      {songs[index] && (
        <audio
          src={songs[index].audioUrl}
          autoPlay={playing}
          onEnded={nextSong}
        />
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
  justifyContent: "center",
  gap: "30px",
  fontFamily: "Inter, Helvetica, Arial, sans-serif",
};

const loadingStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f5f3ef",
};

const title: React.CSSProperties = {
  margin: 0,
  fontSize: "22px",
  color: "#43362f",
  fontWeight: 500,
};

const artist: React.CSSProperties = {
  marginTop: 8,
  color: "#857a72",
  fontSize: "15px",
};

const controls: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "26px",
};

const btn: React.CSSProperties = {
  width: "54px",
  height: "54px",
  borderRadius: "999px",
  border: "1px solid #d6d0c9",
  background: "rgba(255,255,255,0.6)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const playBtn: React.CSSProperties = {
  width: "72px",
  height: "72px",
  borderRadius: "999px",
  border: "none",
  background: "#1f1f1f",
  color: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};