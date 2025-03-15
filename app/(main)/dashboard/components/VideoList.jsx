"use client";
import { useAuthContext } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { RefreshCcw } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const VideoList = () => {
  const [videoList, setVideoList] = useState([]);
  const convex = useConvex();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) GetUserVideoList();
  }, [user]);

  const GetUserVideoList = async () => {
    try {
      const result = await convex.query(api.videoData.GetUserVideos, {
        uid: user?._id,
      });

      if (!result || !Array.isArray(result)) {
        console.error("Invalid video list:", result);
        setVideoList([]);
        return;
      }

      setVideoList(result);
      const isPendingVideo = result?.find((item) => item.status === "pending");
      if (isPendingVideo) GetPendingVideoStatus(isPendingVideo);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideoList([]);
    }
  };

  const GetPendingVideoStatus = (isPendingVideo) => {
    const intervalId = setInterval(async () => {
      const result = await convex.query(api.videoData.GetVideoById, {
        videoId: isPendingVideo?._id,
      });

      if (result?.status === "completed") {
        clearInterval(intervalId);
        GetUserVideoList();
      }
    }, 5000);
  };

  return (
    <div className="p-6">
      {/* Empty State */}
      {videoList.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-28 gap-6 p-6 border border-dashed rounded-xl bg-gray-100 dark:bg-gray-800 shadow-md py-16">
          <Image src="/logo.svg" alt="logo" width={60} height={60} />
          <h2 className="text-gray-500 text-lg text-center">
            You don’t have any videos yet. Start by creating one!
          </h2>
          <Link href="/create-new-video">
            <Button className="bg-blue-600 text-white hover:bg-blue-500 transition-all">
              Create New Video
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
          {videoList.map((video, index) => (
            <Link key={index} href={`/play-video/${video?._id}`} className="group">
              <div className="relative overflow-hidden rounded-xl shadow-lg bg-gray-900">
                {/* Video Thumbnail or Loading Indicator */}
                {video?.images?.length > 0 ? (
                  <>
                    {video.status === "completed" ? (
                      <Image
                        src={video.images[0]}
                        alt={video?.title || "No title"}
                        height={500}
                        width={500}
                        className="w-full h-60 object-cover rounded-xl transition-transform transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-60 flex flex-col items-center justify-center bg-gray-700 text-white rounded-xl animate-pulse">
                        <RefreshCcw className="animate-spin text-gray-300" size={32} />
                        <h2 className="mt-2 text-gray-300">Generating...</h2>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-center text-lg text-gray-400">Please wait...</p>
                )}

                {/* Video Title & Time */}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-white">
                  <h2 className="text-lg font-semibold truncate">{video?.title}</h2>
                  <p className="text-sm text-gray-300">{moment(video?._creationTime).fromNow()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoList;
