"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useMixtapeStore } from "@/store/useMixtapeStore";

export default function CreatePage() {
  const [name, setName] = useState("");

  const router = useRouter();

  const setCreator = useMixtapeStore(
    (state) => state.setCreator
  );

  function handleNext() {
    if (!name.trim()) return;

    setCreator(name);

    router.push("/recipient");
  }

  return (
    <main
      style={{
        height: "100vh",
        width: "100%",
        background: "#f5f3ef",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            color: "#43362f",
            fontFamily: "Inter, Helvetica, Arial, sans-serif",
            fontWeight: 400,
            margin: 0,
            letterSpacing: "-2px",
          }}
        >
          hi.
        </h1>

        <div
          style={{
            width: "360px",
            height: "58px",
            border: "1px solid #9b9188",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            paddingRight: "20px",
            background: "transparent",
          }}
        >
          <input
            type="text"
            placeholder="your name?"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "22px",
              color: "#7a6d63",
              fontFamily: "Inter, Helvetica, Arial, sans-serif",
            }}
          />

          <button
            onClick={handleNext}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "#7a6d63",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowRight
              size={22}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
    </main>
  );
}