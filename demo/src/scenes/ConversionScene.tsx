import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MockScreenshot } from "../components/MockScreenshot";
import { ClaudeCodeTerminal } from "../components/ClaudeCodeTerminal";

export const ConversionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const screenshotScale = interpolate(frame, [0, 15], [1, 0.55], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const screenshotOpacity = interpolate(frame, [0, 15], [1, 0.7], {
    extrapolateRight: "clamp",
  });

  const arrowOpacity = spring({
    frame: frame - 10,
    fps,
    config: { damping: 200 },
  });

  const markdownOpacity = spring({
    frame: frame - 15,
    fps,
    config: { damping: 200 },
  });

  const markdownSlide = interpolate(markdownOpacity, [0, 1], [40, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#11111b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        flexDirection: "row",
      }}
    >
      {/* Screenshot (left) */}
      <div
        style={{
          transform: `scale(${screenshotScale})`,
          opacity: screenshotOpacity,
        }}
      >
        <MockScreenshot />
      </div>

      {/* Arrow */}
      <div
        style={{
          opacity: arrowOpacity,
          fontSize: 48,
          color: "#89b4fa",
          fontWeight: 700,
        }}
      >
        →
      </div>

      {/* Markdown output (right) */}
      <div
        style={{
          opacity: markdownOpacity,
          transform: `translateX(${markdownSlide}px)`,
        }}
      >
        <ClaudeCodeTerminal />
      </div>
    </AbsoluteFill>
  );
};
