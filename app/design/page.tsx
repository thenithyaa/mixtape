"use client";

import { useRouter } from "next/navigation";

import Cassette from "@/components/Cassette";

import { useMixtapeStore } from "@/store/useMixtapeStore";

export default function DesignPage() {
  const router = useRouter();

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
          gap: "42px",
        }}
      >
        {/* TITLE */}

        <h1
          style={{
            margin: 0,
            fontSize: "44px",
            fontWeight: 300,
            color: "#43362f",
          }}
        >
          your mixtape
        </h1>

        {/* CASSETTE */}

        <Cassette playing={false} />

        {/* READY BUTTON */}

        <button
          onClick={async () => {
            try {
              console.log("clicked");

              const creator =
                useMixtapeStore.getState()
                  .creator;

              const receiver =
                useMixtapeStore.getState()
                  .receiver;

              const songs =
                useMixtapeStore.getState()
                  .songs;

              console.log({
                creator,
                receiver,
                songs,
              });

              const res =
                await fetch(
                  "/api/save",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type":
                        "application/json",
                    },
                    body: JSON.stringify({
                      creator,
                      receiver,
                      songs,
                      note: "",
                    }),
                  }
                );

              console.log(res);

              const data =
                await res.json();

              console.log(data);

              if (data.id) {
                router.push(`/share/${data.id}`);
              } else {
                alert(
                  "save failed"
                );
              }
            } catch (err) {
              console.log(err);

              alert(
                "something went wrong"
              );
            }
          }}
          style={{
            border: "none",
            borderRadius: "999px",
            padding: "16px 34px",
            background: "#1f1f1f",
            color: "white",
            fontSize: "15px",
            cursor: "pointer",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          ready!
        </button>
      </div>
    </main>
  );
}