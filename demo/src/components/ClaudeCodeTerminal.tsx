import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const COMMAND = "/snap-context";
const CHARS_PER_FRAME = 0.56;
const TYPE_START = 5;
const TYPE_END = TYPE_START + Math.ceil(COMMAND.length / CHARS_PER_FRAME); // ~30
const ENTER_FRAME = 35;
const THUMB_START = 38;
const LABEL_START = 50;
const TASK_START = 60;

export const ClaudeCodeTerminal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Typewriter
  const charsToShow = Math.min(
    COMMAND.length,
    Math.floor(Math.max(0, (frame - TYPE_START) * CHARS_PER_FRAME)),
  );
  const typedText = COMMAND.slice(0, charsToShow);
  const typingDone = charsToShow >= COMMAND.length;
  const entered = frame >= ENTER_FRAME;

  // Blinking cursor (IntroScene pattern)
  const cursorOpacity = entered
    ? 0
    : interpolate(frame % 16, [0, 4, 8, 12, 16], [1, 1, 0, 0, 1]);

  // Screenshot thumbnail slide-in
  const thumbProgress = spring({
    frame: frame - THUMB_START,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const thumbTranslateY = interpolate(thumbProgress, [0, 1], [30, 0]);
  const thumbOpacity = thumbProgress;

  // "Attached 1 image" label
  const labelOpacity = spring({
    frame: frame - LABEL_START,
    fps,
    config: { damping: 200 },
  });

  // Task subagent block
  const taskOpacity = spring({
    frame: frame - TASK_START,
    fps,
    config: { damping: 200 },
  });

  return (
    <div
      style={{
        width: 540,
        backgroundColor: "#1e1e2e",
        borderRadius: 16,
        padding: 24,
        fontFamily: "monospace",
        color: "#cdd6f4",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
        border: "1px solid #313244",
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 20,
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#f38ba8" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#f9e2af" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#a6e3a1" }} />
        <span style={{ marginLeft: 12, fontSize: 14, color: "#6c7086" }}>
          Claude Code
        </span>
      </div>

      {/* Prompt line */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 18,
          opacity: entered ? 0.6 : 1,
        }}
      >
        <span style={{ color: "#a6e3a1", marginRight: 10, fontWeight: 700 }}>&gt;</span>
        {typedText.length > 0 && (
          <>
            <span style={{ color: "#89b4fa" }}>/</span>
            <span style={{ color: "#cdd6f4" }}>{typedText.slice(1)}</span>
          </>
        )}
        {!entered && (
          <span style={{ opacity: cursorOpacity, color: "#89b4fa", marginLeft: 1 }}>▌</span>
        )}
      </div>

      {/* Screenshot thumbnail */}
      {frame >= THUMB_START && (
        <div
          style={{
            marginTop: 16,
            marginLeft: 20,
            opacity: thumbOpacity,
            transform: `translateY(${thumbTranslateY}px)`,
          }}
        >
          <div
            style={{
              width: 180,
              height: 120,
              borderRadius: 8,
              backgroundColor: "#313244",
              border: "1px solid #45475a",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              padding: 8,
              gap: 6,
            }}
          >
            {/* Mini table rows suggesting content */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 4,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 8,
                    borderRadius: 2,
                    backgroundColor: "#6c7086",
                    opacity: 0.6,
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    height: 8,
                    borderRadius: 2,
                    backgroundColor: i === 0 ? "#89b4fa" : "#585b70",
                    opacity: i === 0 ? 0.7 : 0.4,
                  }}
                />
                <div
                  style={{
                    width: 32,
                    height: 8,
                    borderRadius: 2,
                    backgroundColor: i === 2 ? "#f38ba8" : "#a6e3a1",
                    opacity: 0.5,
                  }}
                />
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#6c7086",
              marginTop: 4,
              textAlign: "center",
            }}
          >
            screenshot.png
          </div>
        </div>
      )}

      {/* Confirmation text */}
      {frame >= LABEL_START && (
        <div
          style={{
            marginTop: 12,
            marginLeft: 20,
            fontSize: 14,
            color: "#a6e3a1",
            opacity: labelOpacity,
          }}
        >
          Attached 1 image
        </div>
      )}

      {/* Task subagent block */}
      {frame >= TASK_START && (
        <div
          style={{
            marginTop: 14,
            marginLeft: 20,
            opacity: taskOpacity,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
            <span style={{ color: "#a6e3a1" }}>●</span>
            <span style={{ color: "#cdd6f4", fontWeight: 700 }}>
              Task(Extract screenshot 1 to markdown)
            </span>
            <span style={{ color: "#6c7086", fontSize: 12 }}>Sonnet 4.6</span>
          </div>
          <div style={{ fontSize: 13, color: "#6c7086", marginLeft: 8 }}>
            └ Done (1 tool use · 14.1k tokens · 11s)
          </div>
          <div style={{ fontSize: 12, color: "#585b70", marginLeft: 12 }}>
            (ctrl+o to expand)
          </div>
        </div>
      )}
    </div>
  );
};
