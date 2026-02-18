import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

const MARKDOWN_TEXT = `| ID | Endpoint    | Method | Status | Time  |
|----|-------------|--------|--------|-------|
| 1  | /api/users  | GET    | 200    | 45ms  |
| 2  | /api/orders | POST   | 201    | 120ms |
| 3  | /api/auth   | POST   | 401    | 12ms  |`;

const CHARS_PER_FRAME = 3;

export const MarkdownOutput: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const charsToShow = Math.min(
    MARKDOWN_TEXT.length,
    Math.floor(frame * CHARS_PER_FRAME),
  );
  const displayedText = MARKDOWN_TEXT.slice(0, charsToShow);

  const cursorOpacity =
    frame % Math.round(fps / 2) < Math.round(fps / 4) ? 1 : 0;

  return (
    <div
      style={{
        width: 620,
        backgroundColor: "#181825",
        borderRadius: 12,
        padding: 24,
        fontFamily: "monospace",
        fontSize: 16,
        lineHeight: 1.6,
        color: "#a6adc8",
        border: "1px solid #313244",
        whiteSpace: "pre",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          marginBottom: 12,
          fontSize: 12,
          color: "#585b70",
          fontFamily: "sans-serif",
          fontWeight: 600,
          letterSpacing: 1,
          textTransform: "uppercase",
        }}
      >
        Markdown Output
      </div>
      <span>{displayedText}</span>
      <span style={{ opacity: cursorOpacity, color: "#89b4fa" }}>▌</span>
    </div>
  );
};
