"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ReadyPage() {
  const { id } = useParams();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/mixtape/${id}`);
      const json = await res.json();
      setData(json);
    }

    load();
  }, [id]);

  if (!data) {
    return <div style={center}>loading...</div>;
  }

  const link = `${window.location.origin}/share/${id}`;

  return (
    <main style={center}>
      <div style={card}>
        <h1>mixtape ready! ✨</h1>

        <p>
          send this to <b>{data.receiver || "your person"}</b> ♡
        </p>

        <div style={box}>{link}</div>

        <button
          onClick={() => navigator.clipboard.writeText(link)}
          style={btn}
        >
          copy link
        </button>
      </div>
    </main>
  );
}

const center: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f5f3ef",
  fontFamily: "Inter",
};

const card: React.CSSProperties = {
  width: "420px",
  padding: "24px",
  textAlign: "center",
  background: "white",
  borderRadius: "14px",
  border: "1px solid #ddd",
};

const box: React.CSSProperties = {
  marginTop: "12px",
  padding: "12px",
  border: "1px solid #ddd",
  wordBreak: "break-all",
};

const btn: React.CSSProperties = {
  marginTop: "12px",
  padding: "10px 18px",
  borderRadius: "999px",
  border: "none",
  background: "#1f1f1f",
  color: "white",
  cursor: "pointer",
};