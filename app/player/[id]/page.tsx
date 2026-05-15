
"use client";

import { useState } from "react";
import ReactPlayer from "react-player";
import {
  Pause,
  Play,
  SkipForward,
  SkipBack,
} from "lucide-react";

import Cassette from "@/components/Cassette";
import { useMixtapeStore } from "@/store/useMixtapeStore";

export default function PlayerPage() {
  const songs = useMixtapeStore(
    (state) => state.songs
  );

  const [index, setIndex] = useState(0);

  const [playing, setPlaying] =
    useState(false);

  function nextSong() {
    setIndex((prev) =>
      prev === songs.length - 1
        ? 0
        : prev + 1
    );
  }

  function prevSong() {
    setIndex((prev) =>
      prev === 0
        ? songs.length - 1
        : prev - 1
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f3ef",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          "Inter, Helvetica, Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
        }}
      >
        {/* CASSETTE */}

        <Cassette playing={playing} />

        {/* SONG TITLE */}

        {songs[index] && (
          <div
            style={{
              textAlign: "center",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "22px",
                color: "#43362f",
                fontWeight: 500,
              }}
            >
              {songs[index].title}
            </h2>

            <p
              style={{
                marginTop: "8px",
                color: "#857a72",
                fontSize: "15px",
              }}
            >
              {songs[index].artist}
            </p>
          </div>
        )}

        {/* PLAYER CONTROLS */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "26px",
          }}
        >
          <button
            onClick={prevSong}
            style={controlButton}
          >
            <SkipBack size={22} />
          </button>

          <button
            onClick={() =>
              setPlaying(!playing)
            }
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "999px",
              border: "none",
              background: "#1f1f1f",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.15)",
              transition: "0.2s",
            }}
          >
            {playing ? (
              <Pause size={28} fill="white" />
            ) : (
              <Play
                size={28}
                fill="white"
                style={{ marginLeft: "3px" }}
              />
            )}
          </button>

          <button
            onClick={nextSong}
            style={controlButton}
          >
            <SkipForward size={22} />
          </button>
        </div>

        {/* AUDIO */}

        {songs[index] && (
          <ReactPlayer
            url={songs[index].audioUrl}
            playing={playing}
            width="0"
            height="0"
          />
        )}
      </div>
    </main>
  );
}

const controlButton = {
  width: "54px",
  height: "54px",
  borderRadius: "999px",
  border: "1px solid #d6d0c9",
  background: "rgba(255,255,255,0.6)",
  color: "#43362f",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  backdropFilter: "blur(8px)",
  transition: "0.2s",
};


