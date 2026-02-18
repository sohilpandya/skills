import React from "react";
import { Composition } from "remotion";
import { SnapContextDemo } from "./SnapContextDemo";
// Total frames: 75 + 75 + 100 + 95 - 10 - 10 - 10 = 315 (10.5s at 30fps)

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="SnapContextDemo"
      component={SnapContextDemo}
      durationInFrames={315}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
