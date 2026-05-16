
"use client";

import { motion } from "framer-motion";

export default function Cassette({
  playing,
}: {
  playing: boolean;
}) {
  return (
    <div
      style={{
        width: "460px",
        height: "280px",
        position: "relative",
        borderRadius: "16px",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.45), rgba(255,255,255,0.18))",
        border: "1px solid rgba(255,255,255,0.6)",
        backdropFilter: "blur(18px)",
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.08), inset 0 0 30px rgba(255,255,255,0.18)",
        overflow: "hidden",
      }}
    >
      {/* transparent shine */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom right, rgba(255,255,255,0.35), transparent 40%)",
          pointerEvents: "none",
        }}
      />

      {/* screws */}

      {[
        [18, 18],
        [18, 442],
        [262, 18],
        [262, 442],
      ].map(([top, left], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top,
            left,
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "rgba(140,140,140,0.8)",
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.7)",
          }}
        />
      ))}

      {/* top label */}

      <div
        style={{
          position: "absolute",
          top: "26px",
          width: "100%",
          textAlign: "center",
          fontSize: "14px",
          color: "#716b66",
          letterSpacing: "2px",
          fontFamily: "serif",
        }}
      >
        mixtape dreams
      </div>

      {/* tape window */}

      <div
        style={{
          position: "absolute",
          top: "78px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "350px",
          height: "105px",
          borderRadius: "18px",
          background: "rgba(255,255,255,0.22)",
          border: "1px solid rgba(255,255,255,0.5)",
          overflow: "hidden",
        }}
      >
        {/* tape strip */}

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            transform: "translateY(-50%)",
            height: "2px",
            background: "rgba(50,50,50,0.25)",
          }}
        />

        {/* left reel */}

        <motion.div
          animate={playing ? { rotate: 360 } : {}}
          transition={{
            repeat: Infinity,
            duration: playing ? 2.5 : 6,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: "26px",
            top: "10px",
            width: "84px",
            height: "84px",
            borderRadius: "50%",
            background: "#1d1d1d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "#f2f2f2",
              zIndex: 2,
            }}
          />

          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "5px",
                height: "30px",
                borderRadius: "4px",
                background: "rgba(255,255,255,0.92)",
                transform: `rotate(${i * 60}deg)`,
              }}
            />
          ))}
        </motion.div>

        {/* right reel */}

        <motion.div
          animate={playing ? { rotate: -360 } : {}}
          transition={{
            repeat: Infinity,
            duration: playing ? 2 : 6,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            right: "26px",
            top: "10px",
            width: "84px",
            height: "84px",
            borderRadius: "50%",
            border: "6px solid rgba(255,255,255,0.95)",
            background: "rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.95)",
              zIndex: 2,
            }}
          />

          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "5px",
                height: "30px",
                borderRadius: "4px",
                background: "rgba(255,255,255,0.95)",
                transform: `rotate(${i * 60}deg)`,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* bottom opening */}

      <div
        style={{
          position: "absolute",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120px",
          height: "12px",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.55)",
        }}
      />
    </div>
  );
}