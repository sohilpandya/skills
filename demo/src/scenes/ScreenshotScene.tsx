import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MockScreenshot } from "../components/MockScreenshot";

export const ScreenshotScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const translateX = interpolate(slideIn, [0, 1], [-800, 0]);

  const scale = interpolate(slideIn, [0, 1], [0.9, 1], {
    extrapolateRight: "clamp",
  });

  // Camera flash effect after screenshot lands (~frame 25)
  const flashOpacity = interpolate(frame, [25, 28, 35], [0, 0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#11111b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          transform: `translateX(${translateX}px) scale(${scale})`,
        }}
      >
        <MockScreenshot />
      </div>
      {/* Camera flash overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: "white",
          opacity: flashOpacity,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
