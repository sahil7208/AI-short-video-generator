"use client"
import React, { useState, useEffect } from 'react'
import Topic from './components/Topic'
import VideoStyle from './components/VideoStyle';
import Voice from './components/Voice';
import Captions from './components/Captions';
import { Button } from '@/components/ui/button';
import { Loader2Icon, WandSparkles } from 'lucide-react';
import Preview from './components/Preview';
import axios from 'axios';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useAuthContext } from '@/app/provider';
import { useRouter } from 'next/navigation';

 const CreateNewVideo = () => {
  const [formData, setFormData] = useState();
  const [loading,setLoading] = useState(false)
    const {user} = useAuthContext();
    const router = useRouter();
  const CreateInitialVideoRecord = useMutation(api.videoData.CreateVideoData);
  const onHandleInputChange = (fieldName,fieldValue) => {
    console.log("handleInputchange called")
    setFormData(prev => (
      {
        ...prev,
        [fieldName] : fieldValue
      }
    ))
   
  }

  const GenerateVideo = async() => {

    if(user?.credits <= 0){
      alert('Plese add more credits')
      return;
    }

    if(!formData?.topic || !formData?.script || !formData?.VideoStyle || !formData?.caption || !formData?.voice){
      console.log("error enter all fields")
      return;
    }
    setLoading(true)

    const resp = await CreateInitialVideoRecord({
      title: formData.title,
      topic: formData.topic,
      script: formData.script,
      VideoStyle: formData.VideoStyle,
      caption: formData.caption,
      voice: formData.voice,
      uid: user?._id,
      createdBy: user?.email,
      credits: user?.credits
    })

    console.log("resp at create new video: ",resp)
    setLoading(false)
    router.push('/dashboard');
    const result = await axios.post('/api/generate-video-data',{
      ...formData,
      recordId: resp,
      // credits: user?.credits
    })
    console.log("result at generate video: ",result)
  }


  
  useEffect(() => {
    console.log("Updated form data:", formData);
  }, [formData]);
  return (
    <div>
      <h2 className='text-2xl ml-7'>Create New Video</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-8 gap-7'>
        <div className='col-span-2 p-7 border rounded-xl h-[82vh] overflow-auto'>
        <Topic onHandleInputChange={onHandleInputChange}/>
        <VideoStyle onHandleInputChange={onHandleInputChange}/>
        <Voice onHandleInputChange={onHandleInputChange}/>
        <Captions onHandleInputChange={onHandleInputChange}/>
        <Button disabled={loading} onClick={GenerateVideo} className="w-full mt-5">{loading?<Loader2Icon className='animate-spin'/>:<WandSparkles/>}Generate Video</Button>
        </div>
        <div>
        <Preview formData={formData}/>
        </div>
      </div>
      
    </div>
  )
}

export default CreateNewVideo
