import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { IntroScene } from "./scenes/IntroScene";
import { ScreenshotScene } from "./scenes/ScreenshotScene";
import { ConversionScene } from "./scenes/ConversionScene";
import { TaglineScene } from "./scenes/TaglineScene";

export const SnapContextDemo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={75}>
        <IntroScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 10 })}
      />

      <TransitionSeries.Sequence durationInFrames={75}>
        <ScreenshotScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 10 })}
      />

      <TransitionSeries.Sequence durationInFrames={85}>
        <ConversionScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 10 })}
      />

      <TransitionSeries.Sequence durationInFrames={95}>
        <TaglineScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
