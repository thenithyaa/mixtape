"use client";

import { useRouter } from "next/navigation";
import Cassette from "@/components/Cassette";
import { useMixtapeStore } from "@/store/useMixtapeStore";

export default function DesignPage() {
  const router = useRouter();

  const songs = useMixtapeStore((s) => s.songs);
  const receiver = useMixtapeStore((s) => s.receiver);

  async function createMixtape() {
    if (songs.length === 0) return;

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

    if (data.id) {
      router.push(`/ready/${data.id}`);
    }
  }

  return (
    <main style={page}>
      <h1 style={title}>your mixtape</h1>

      <Cassette playing={false} />

      {/* READY BUTTON ONLY HERE */}
      <button onClick={createMixtape} style={btn}>
        ready!
      </button>
    </main>
  );
}

/* styles */

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f5f3ef",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "40px",
  fontFamily: "Inter",
};

const title: React.CSSProperties = {
  fontSize: "44px",
  fontWeight: 300,
  color: "#43362f",
};

const btn: React.CSSProperties = {
  border: "none",
  borderRadius: "999px",
  padding: "14px 28px",
  background: "#1f1f1f",
  color: "white",
  cursor: "pointer",
};