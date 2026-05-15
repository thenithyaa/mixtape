"use client";

import { useParams } from "next/navigation";

import { useMixtapeStore } from "@/store/useMixtapeStore";

export default function SharePage() {
  const params = useParams();

  const receiver =
    useMixtapeStore(
      (state) => state.receiver
    );

  const link = `${window.location.origin}/player/${params.id}`;

  async function copyLink() {
    await navigator.clipboard.writeText(
      link
    );

    alert("link copied!");
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
          width: "520px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          textAlign: "center",
        }}
      >
        {/* TITLE */}

        <h1
          style={{
            margin: 0,
            fontSize: "42px",
            fontWeight: 300,
            color: "#43362f",
          }}
        >
          mixtape ready!
        </h1>

        {/* RECEIVER TEXT */}

        <p
          style={{
            color: "#7d736b",
            lineHeight: 1.6,
            fontSize: "16px",
          }}
        >
          send this to{" "}
          <span
            style={{
              color: "#43362f",
              fontWeight: 500,
            }}
          >
            {receiver}
          </span>{" "}
          ♡
        </p>

        {/* LINK BOX */}

        <div
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "16px",
            border:
              "1px solid #d8d0c7",
            background:
              "rgba(255,255,255,0.6)",
            wordBreak: "break-all",
            color: "#43362f",
            fontSize: "14px",
          }}
        >
          {link}
        </div>

        {/* COPY BUTTON */}

        <button
          onClick={copyLink}
          style={{
            border: "none",
            borderRadius: "999px",
            padding: "14px 28px",
            background: "#1f1f1f",
            color: "white",
            fontSize: "15px",
            cursor: "pointer",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          copy link
        </button>
      </div>
    </main>
  );
}