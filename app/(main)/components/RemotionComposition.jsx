import React, { useEffect } from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { options } from "../create-new-video/components/Captions";

// Function to convert Tailwind classes to inline styles
const convertTailwindToStyle = (classString) => {
  const styleMap = {
    "text-blue-300": { color: "#93c5fd" },
    "text-red-400": { color: "#f87171" },
    "text-green-400": { color: "#4ade80" },
    "text-yellow-400": { color: "#facc15" },
    "text-purple-300": { color: "#d8b4fe" },
    "text-pink-400": { color: "#f472b6" },
    "text-xl": { fontSize: "2rem" },
    "text-2xl": { fontSize: "2.5rem" },
    "text-3xl": { fontSize: "2.875rem" },
    "font-bold": { fontWeight: "bold" },
    "font-extrabold": { fontWeight: "800" },
    "font-semibold": { fontWeight: "600" },
    "px-3": { paddingLeft: "0.75rem", paddingRight: "0.75rem" },
    "px-4": { paddingLeft: "1rem", paddingRight: "1rem" },
    "px-5": { paddingLeft: "1.25rem", paddingRight: "1.25rem" },
    "py-1": { paddingTop: "0.25rem", paddingBottom: "0.25rem" },
    "py-2": { paddingTop: "0.5rem", paddingBottom: "0.5rem" },
    "py-3": { paddingTop: "0.75rem", paddingBottom: "0.75rem" },
    "rounded-md": { borderRadius: "0.375rem" },
    "rounded-lg": { borderRadius: "0.5rem" },
  };

  const styles = {};
  if (classString) {
    classString.split(" ").forEach((className) => {
      if (styleMap[className]) {
        Object.assign(styles, styleMap[className]);
      }
    });
  }

  return styles;
};

const RemotionComposition = ({ videoData, setDurationInFrame }) => {
  const captions = videoData?.captionJson;
  const { fps } = useVideoConfig();
  const imageList = videoData?.images;
  const frame = useCurrentFrame();

  useEffect(() => {
    if (videoData) getDurationFrame();
  }, [videoData]);

  const getDurationFrame = () => {
    const totalDuration = captions[captions?.length - 1]?.end * fps;
    setDurationInFrame(totalDuration);
    return totalDuration;
  };

  const getCurrentCaption = () => {
    const currentTime = frame / 30;
    const currentCaption = captions?.find(
      (item) => currentTime >= item?.start && currentTime <= item?.end
    );
    return currentCaption ? currentCaption?.word : "";
  };

  // Select the current caption style dynamically
  const selectedCaption = options.find((opt) => opt.name === videoData?.caption?.name);
  const dynamicCaptionStyle = convertTailwindToStyle(selectedCaption?.style || "");

  // Handle gradient text separately
  const isGradientText = selectedCaption?.style.includes("bg-gradient-to-r");
  const gradientStyle = isGradientText
    ? {
        backgroundImage: "linear-gradient(to right, #6366f1, #a855f7)", // Indigo to Purple
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }
    : {};

  return (
    <div>
      <AbsoluteFill>
        {imageList?.map((item, index) => {
          const startTime = (index * getDurationFrame()) / imageList.length;
          const duration = getDurationFrame();
          const scale = (index) =>
            interpolate(
              frame,
              [startTime, startTime + duration / 2, startTime + duration],
              index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
          return (
            <Sequence key={index} from={startTime} durationInFrames={getDurationFrame()}>
              <AbsoluteFill>
                <Img
                  src={item}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${scale(index)})`,
                  }}
                />
              </AbsoluteFill>
            </Sequence>
          );
        })}
      </AbsoluteFill>

      {/* Caption Rendering with Dynamic Styles */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          bottom: 150,
          height: 150,
          textAlign: "center",
          top:undefined
        }}
      >
        <h2
          style={{
            ...dynamicCaptionStyle, // Apply parsed Tailwind styles
            ...gradientStyle, // Apply gradient styles if needed
            backgroundColor: isGradientText ? "transparent" : "rgba(0, 0, 0, 0.6)", // Ensure readability
          }}
        >
          {getCurrentCaption()}
        </h2>
      </AbsoluteFill>

      {videoData?.audioUrl && <Audio src={videoData?.audioUrl} />}
    </div>
  );
};

export default RemotionComposition;
