import React from 'react';

import { MyComposition } from './Composition';
import { Composition } from 'remotion';
import RemotionComposition from '../app/(main)/components/RemotionComposition'

const videoData = {
  audioUrl: '',
  captionJson: [
    {
      confidence: 0.90738654,
      end: 0.79999995,
      start: 0.32,
      word: "right",
    },
    {
      confidence: 0.9366863,
      end: 1.12,
      start: 0.79999995,
      word: "side",
    },
    {
      confidence: 0.99635834,
      end: 1.52,
      start: 1.12,
      word: "shows",
    },
    {
      confidence: 0.9908832,
      end: 1.92,
      start: 1.52,
      word: "ai",
    },
    {
      confidence: 0.9975732,
      end: 2.48,
      start: 1.92,
      word: "seamlessly",
    },
    {
      confidence: 0.99936706,
      end: 2.96,
      start: 2.48,
      word: "performing",
    },
    {
      confidence: 0.9997224,
      end: 3.1999998,
      start: 2.96,
      word: "the",
    },
    {
      confidence: 0.99974996,
      end: 3.4399998,
      start: 3.1999998,
      word: "same",
    },
    {
      confidence: 0.9852416,
      end: 4.08,
      start: 3.4399998,
      word: "task",
    },
    {
      confidence: 0.999315,
      end: 4.56,
      start: 4.16,
      word: "tired",
    }
  ],
  images: ["https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1740919252125.png?alt=media&token=4c181e1f-664e-464b-820f-23e1f450302b"]
}

 
export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="youtubeShort"
        component={RemotionComposition}
        durationInFrames={Number((videoData?.captionJson[videoData?.captionJson?.length - 1]?.end * 30).toFixed(0))}
        fps={30}
        width={1280}
        height={720}
        defaultProps={
          {
            videoData:videoData
          }
        }
      />
    </>
  );
};