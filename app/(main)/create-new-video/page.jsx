"use client";
import React, { useState, useEffect } from "react";
import Topic from "./components/Topic";
import VideoStyle from "./components/VideoStyle";
import Voice from "./components/Voice";
import Captions from "./components/Captions";
import { Button } from "@/components/ui/button";
import { Loader2Icon, WandSparkles } from "lucide-react";
import Preview from "./components/Preview";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuthContext } from "@/app/provider";
import { useRouter } from "next/navigation";

const CreateNewVideo = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const router = useRouter();
  const CreateInitialVideoRecord = useMutation(api.videoData.CreateVideoData);

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const GenerateVideo = async () => {
    if (user?.credits <= 0) {
      alert("Please add more credits");
      return;
    }

    if (!formData?.topic || !formData?.script || !formData?.VideoStyle || !formData?.caption || !formData?.voice) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const resp = await CreateInitialVideoRecord({
        title: formData.title,
        topic: formData.topic,
        script: formData.script,
        VideoStyle: formData.VideoStyle,
        caption: formData.caption,
        voice: formData.voice,
        uid: user?._id,
        createdBy: user?.email,
        credits: user?.credits,
      });

      router.push("/dashboard");
      await axios.post("/api/generate-video-data", {
        ...formData,
        recordId: resp,
      });
    } catch (error) {
      console.error("Error generating video:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Updated form data:", formData);
  }, [formData]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Video</h2>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-8 gap-7">
        {/* Left Section: Form Inputs */}
        <div className="lg:col-span-2 p-6 border rounded-xl shadow-md dark:border-gray-700 h-[80vh] overflow-auto">
          <Topic onHandleInputChange={onHandleInputChange} />
          <VideoStyle onHandleInputChange={onHandleInputChange} />
          <Voice onHandleInputChange={onHandleInputChange} />
          <Captions onHandleInputChange={onHandleInputChange} />

          {/* Generate Video Button */}
          <Button 
            disabled={loading} 
            onClick={GenerateVideo} 
            className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-500 transition-all"
          >
            {loading ? <Loader2Icon className="animate-spin" /> : <WandSparkles />} 
            {loading ? "Generating..." : "Generate Video"}
          </Button>
        </div>

        {/* Right Section: Video Preview (Sticky on Large Screens) */}
        <div className="relative lg:sticky top-6">
          <Preview formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewVideo;
