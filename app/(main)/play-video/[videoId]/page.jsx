"use client";
import React, { useEffect, useState } from "react";
import RemotionPlayer from "../components/RemotionPlayer";
import VideoInfo from "../components/VideoInfo";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";

const PlayVideo = () => {
  const { videoId } = useParams();
  const convex = useConvex();
  const [videoData, setVideoData] = useState();

  useEffect(() => {
    if (videoId) GetVideoDataById();
  }, [videoId]);

  const GetVideoDataById = async () => {
    const result = await convex.query(api.videoData.GetVideoById, {
      videoId: videoId,
    });
    setVideoData(result);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex justify-center">
          <RemotionPlayer videoData={videoData} />
        </div>
        <div>
          <VideoInfo videoData={videoData} />
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
