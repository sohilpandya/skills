import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

const LINE1 = "You take a screenshot...";
const LINE2 = "snap-context turns it into markdown.";

const TYPING_START_LINE1 = 3;
const CHARS_PER_FRAME = 1.2;
const LINE2_DELAY = 8; // pause between lines

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Line 1 typewriter
  const line1Chars = Math.floor(
    Math.max(0, (frame - TYPING_START_LINE1) * CHARS_PER_FRAME)
  );
  const line1Text = LINE1.slice(0, Math.min(line1Chars, LINE1.length));
  const line1Done = line1Chars >= LINE1.length;

  // Line 2 typewriter (starts after line 1 + pause)
  const line2Start =
    TYPING_START_LINE1 + Math.ceil(LINE1.length / CHARS_PER_FRAME) + LINE2_DELAY;
  const line2Chars = Math.floor(
    Math.max(0, (frame - line2Start) * CHARS_PER_FRAME)
  );
  const line2Text = LINE2.slice(0, Math.min(line2Chars, LINE2.length));

  // Blinking cursor
  const cursorOpacity = interpolate(
    frame % 16,
    [0, 4, 8, 12, 16],
    [1, 1, 0, 0, 1]
  );

  // Show cursor on whichever line is actively typing
  const cursorOnLine2 = line1Done && frame >= line2Start;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#11111b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily,
      }}
    >
      <div
        style={{
          fontSize: 52,
          fontWeight: 400,
          color: "#cdd6f4",
          lineHeight: 1.6,
          textAlign: "center",
        }}
      >
        <div>
          {line1Text}
          {!cursorOnLine2 && (
            <span style={{ opacity: cursorOpacity, color: "#89b4fa" }}>|</span>
          )}
        </div>
        <div style={{ fontWeight: 700, color: "#89b4fa" }}>
          {line2Text}
          {cursorOnLine2 && (
            <span style={{ opacity: cursorOpacity }}>|</span>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
