"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import Cassette from "@/components/Cassette";

export default function SharePage() {
  const { id } = useParams();
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [stage, setStage] = useState(0);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/mixtape/${id}`);
      const json = await res.json();
      setData(json);
    }

    load();
  }, [id]);

  function nextSong() {
    setIndex((p) =>
      p === data.songs.length - 1 ? 0 : p + 1
    );
  }

  function prevSong() {
    setIndex((p) =>
      p === 0 ? data.songs.length - 1 : p - 1
    );
  }

  if (!data) {
    return <div style={center}>loading...</div>;
  }

  const song = data.songs[index];

  return (
    <main style={center}>
      {/* ✉️ ENVELOPE */}
      {stage === 0 && (
        <div style={envelope} onClick={() => setStage(1)}>
          ✉️
          <p style={{ fontSize: "16px" }}>tap to open</p>
        </div>
      )}

      {/* 📜 NOTE */}
      {stage === 1 && (
        <div style={note} onClick={() => setStage(2)}>
          <h2>for {data.receiver} ♡</h2>
          <p>{data.note || "a mixtape made with love..."}</p>

          <p style={{ marginTop: 20, opacity: 0.6 }}>
            tap to open cassette
          </p>
        </div>
      )}

      {/* 📼 CASSETTE + PLAYER */}
      {stage === 2 && (
        <div style={playerBox}>
          <Cassette playing={playing} />

          <div style={{ marginTop: 20, textAlign: "center" }}>
            <h3 style={{ margin: 0 }}>{song?.title}</h3>
            <p style={{ margin: 0, opacity: 0.7 }}>
              {song?.artist}
            </p>
          </div>

          {/* CONTROLS */}
          <div style={controls}>
            <button onClick={prevSong}>⏮</button>

            <button
              onClick={() => setPlaying(!playing)}
              style={playBtn}
            >
              {playing ? "pause" : "play"}
            </button>

            <button onClick={nextSong}>⏭</button>
          </div>

          {/* AUDIO */}
          {song && (
            <ReactPlayer
              url={song.audioUrl}
              playing={playing}
              width="0"
              height="0"
            />
          )}

          <p
            style={{ marginTop: 20, opacity: 0.5, fontSize: 12 }}
          >
            tap play to start mixtape
          </p>
        </div>
      )}
    </main>
  );
}

/* ---------------- STYLES ---------------- */

const center: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f5f3ef",
  fontFamily: "Inter",
};

const envelope: React.CSSProperties = {
  fontSize: "60px",
  textAlign: "center",
  cursor: "pointer",
  animation: "float 2s ease-in-out infinite",
};

const note: React.CSSProperties = {
  width: "360px",
  padding: "24px",
  background: "#fffdf7",
  borderRadius: "14px",
  textAlign: "center",
  cursor: "pointer",
  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
};

const playerBox: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const controls: React.CSSProperties = {
  marginTop: "20px",
  display: "flex",
  gap: "20px",
  alignItems: "center",
};

const playBtn: React.CSSProperties = {
  padding: "12px 20px",
  borderRadius: "999px",
  border: "none",
  background: "#1f1f1f",
  color: "white",
  cursor: "pointer",
};