"use client";

import { useState } from "react";

import {
  Search,
  ArrowRight,
  Heart,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { useMixtapeStore } from "@/store/useMixtapeStore";

export default function SongsPage() {
  const [query, setQuery] = useState("");

  const [results, setResults] =
    useState<any[]>([]);

  const [addedSong, setAddedSong] =
    useState("");

  const router = useRouter();

  const addSong = useMixtapeStore(
    (state) => state.addSong
  );

  const songs = useMixtapeStore(
    (state) => state.songs
  );

  async function searchSongs() {
    if (!query.trim()) return;

    const res = await fetch(
      `/api/search?q=${query}`
    );

    const data = await res.json();

    setResults(data);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f3ef",
        display: "flex",
        justifyContent: "center",
        paddingTop: "100px",
        fontFamily:
          "Inter, Helvetica, Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "520px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "26px",
        }}
      >
        {/* TITLE */}

        <h1
          style={{
            fontSize: "48px",
            fontWeight: 300,
            color: "#43362f",
            margin: 0,
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          add songs
        </h1>

        {/* HEART BAR */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            minHeight: "28px",
          }}
        >
          {[...Array(10)].map((_, index) => (
            <Heart
              key={index}
              size={18}
              fill={
                index < songs.length
                  ? "#c08497"
                  : "transparent"
              }
              color={
                index < songs.length
                  ? "#c08497"
                  : "#cfc7be"
              }
              strokeWidth={1.8}
              style={{
                transition: "0.3s",
              }}
            />
          ))}
        </div>

        {/* SEARCH BAR */}

        <div
          style={{
            width: "100%",
            height: "58px",
            border: "1px solid #9b9188",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "18px",
            paddingRight: "18px",
          }}
        >
          <input
            type="text"
            placeholder="search songs..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "18px",
              color: "#7a6d63",
              fontFamily:
                "Inter, Helvetica, Arial, sans-serif",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            {/* SEARCH BUTTON */}

            <button
              onClick={searchSongs}
              style={{
                border: "none",
                background:
                  "transparent",
                cursor: "pointer",
                color: "#7a6d63",
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "center",
              }}
            >
              <Search
                size={18}
                strokeWidth={1.8}
              />
            </button>

            {/* NEXT PAGE BUTTON */}

            <button
              onClick={() =>
                router.push("/design")
              }
              style={{
                border: "none",
                background:
                  "transparent",
                cursor: "pointer",
                color: "#7a6d63",
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "center",
              }}
            >
              <ArrowRight
                size={20}
                strokeWidth={1.8}
              />
            </button>
          </div>
        </div>

        {/* RESULTS */}

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {results.map((song: any) => (
            <div
              key={song.url}
              style={{
                width: "100%",
                border:
                  "1px solid #d7d0c8",
                borderRadius: "14px",
                padding: "16px 18px",
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                background:
                  "rgba(255,255,255,0.45)",
                backdropFilter:
                  "blur(4px)",
                transition: "0.2s",
              }}
            >
              <div
                style={{
                  maxWidth: "360px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "#43362f",
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: 1.4,
                  }}
                >
                  {song.title}
                </p>

                <p
                  style={{
                    margin: 0,
                    marginTop: "5px",
                    color: "#8a8178",
                    fontSize: "14px",
                  }}
                >
                  {song.artist}
                </p>
              </div>

              {/* ADD BUTTON */}

              <button
                onClick={() => {
                  addSong({
                    title: song.title,
                    artist: song.artist,
                    audioUrl:
                      song.url,
                  });

                  setAddedSong(
                    song.url
                  );

                  setTimeout(() => {
                    setAddedSong("");
                  }, 500);
                }}
                disabled={
                  songs.length >= 10
                }
                style={{
                  border:
                    "1px solid #9b9188",
                  borderRadius: "999px",
                  padding:
                    "8px 16px",
                  background:
                    songs.length >= 10
                      ? "#d8d3cd"
                      : addedSong ===
                        song.url
                      ? "#43362f"
                      : "transparent",
                  cursor: "pointer",
                  color:
                    addedSong ===
                    song.url
                      ? "white"
                      : "#6f645c",
                  fontSize: "14px",
                  transform:
                    addedSong ===
                    song.url
                      ? "scale(1.08)"
                      : "scale(1)",
                  transition:
                    "0.25s ease",
                }}
              >
                {addedSong ===
                song.url
                  ? "added!"
                  : "add"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}