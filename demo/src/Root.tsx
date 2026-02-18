import React from "react";
import { Composition } from "remotion";
import { SnapContextDemo } from "./SnapContextDemo";
// Total frames: 75 + 75 + 85 + 95 - 10 - 10 - 10 = 300 (10s at 30fps)

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="SnapContextDemo"
      component={SnapContextDemo}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
