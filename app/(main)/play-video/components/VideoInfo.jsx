import { Button } from "@/components/ui/button";
import { ArrowLeft, DownloadIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const VideoInfo = ({ videoData }) => {
  return (
    <div className="p-6 border rounded-xl shadow-md bg-white dark:bg-gray-900">
      {/* Back to Dashboard */}
      <Link href={"/dashboard"}>
        <h2 className="flex items-center gap-2 text-blue-500 hover:underline">
          <ArrowLeft />
          Back to Dashboard
        </h2>
      </Link>

      {/* Video Details */}
      <div className="mt-5 space-y-4">
        <h2 className="text-xl font-semibold">Project Name: {videoData?.title}</h2>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Script:</span> {videoData?.script}
        </p>
        <h2 className="text-gray-700 dark:text-gray-200">
          <span className="font-semibold">Video Style:</span> {videoData?.VideoStyle}
        </h2>

        {/* Download Button */}
        <Button className="mt-4 flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white">
          <DownloadIcon />
          Export & Download
        </Button>

        <h1 className="text-gray-400 mt-3">Feature in development...</h1>
      </div>
    </div>
  );
};

export default VideoInfo;
