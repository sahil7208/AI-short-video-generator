"use client";
import React, { useState } from "react";
import { Player } from "@remotion/player";
import RemotionComposition from "../../components/RemotionComposition";

const RemotionPlayer = ({ videoData }) => {
  const [durationInFrames, setDurationInFrame] = useState(100);

  return (
    <div className="w-full flex justify-center">
      <Player
        component={RemotionComposition}
        durationInFrames={Number(durationInFrames.toFixed(0)) + 100}
        compositionWidth={720}
        compositionHeight={1280}
        fps={30}
        controls
        style={{
          width: "90vw", // Responsive width
          maxWidth: "400px", // Keeps it well-proportioned
          height: "70vh",
        }}
        inputProps={{
          videoData: videoData,
          setDurationInFrame: (frameValue) => setDurationInFrame(frameValue),
        }}
      />
    </div>
  );
};

export default RemotionPlayer;
