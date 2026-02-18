import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

export const TaglineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const titleScale = interpolate(titleOpacity, [0, 1], [0.9, 1]);

  const subtitleOpacity = spring({
    frame: frame - 12,
    fps,
    config: { damping: 200 },
  });

  const brandOpacity = spring({
    frame: frame - 24,
    fps,
    config: { damping: 200 },
  });

  const brandSlide = interpolate(brandOpacity, [0, 1], [20, 0]);

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
      {/* Main tagline */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          fontSize: 72,
          fontWeight: 900,
          color: "#cdd6f4",
          letterSpacing: -1,
        }}
      >
        Screenshots → Markdown
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          fontSize: 36,
          fontWeight: 400,
          color: "#89b4fa",
          marginTop: 16,
        }}
      >
        Save tokens in your context window.
      </div>

      {/* Branding */}
      <div
        style={{
          opacity: brandOpacity,
          transform: `translateY(${brandSlide}px)`,
          marginTop: 60,
          fontSize: 24,
          fontWeight: 700,
          color: "#585b70",
          letterSpacing: 2,
        }}
      >
        snap-context
      </div>
    </AbsoluteFill>
  );
};
