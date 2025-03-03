'use client'
import { useAuthContext } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { RefreshCcw } from 'lucide-react';
import moment from 'moment/moment';


import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const VideoList = () => {
    const [videoList, setVideoList] = useState([]);
    const convex = useConvex();
    const { user } = useAuthContext();
    console.log("user: ", user)
    useEffect(() => {
        user && GetUserVideoList();
    }, [user])

    const GetUserVideoList = async () => {
        try {
            const result = await convex.query(api.videoData.GetUserVideos, {
                uid: user?._id,
            });

            if (!result || !Array.isArray(result)) {
                console.error("Invalid video list:", result);
                setVideoList([]); // Ensure it's always an array
                return;
            }

            setVideoList(result);
            console.log("result: ", result);
            const isPendingVideo = result?.find((item) => item.status == 'pending')
            isPendingVideo && GetPendingVideoStatus(isPendingVideo)
        } catch (error) {
            console.error("Error fetching videos:", error);
            setVideoList([]);
        }
    };

    const GetPendingVideoStatus = (isPendingVideo) => {
        const intervalId = setInterval(async () => {
            const result = await convex.query(api.videoData.GetVideoById, {
                videoId: isPendingVideo?._id
            })
            if (result?.status == 'completed') {
                clearInterval(intervalId)
                console.log("video process completed")
                GetUserVideoList();
            }
            console.log("still pending")
        }, 5000)
    }

    return (
        <div>
            {
                videoList?.length == 0 ?
                    <div className='flex flex-col items-center justify-center mt-28 gap-5 p-5 border border-dashed rounded-xl py-16'>
                        <Image src={'/logo.svg'} alt="logo" width={60} height={60} />
                        <h2 className='text-gray-400 text-lg'>You dont't have any video created. Create a new one</h2>
                        <Link href={'/create-new-video'}>
                            <Button>Create new Video</Button>
                        </Link>
                    </div> :
                    <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-10 '>
                        {
                            videoList?.map((video, index) => (
                                <Link key={index} href={'/play-video/'+video?._id}>
                                    <div>
                                        {video?.images?.length > 0 ? (
                                            <div className='relative'>
                                                {video?.status == 'completed' ?
                                                    <Image src={video.images[0]} alt={video?.title || "No title"} height={500} width={500} className='w-full object-cover rounded-xl aspect-[2/3]' /> :
                                                    <div className='aspect-[2/3] p-5 w-full rounded-xl bg-slate-900 flex items-center justify-center' >
                                                        <RefreshCcw className='animate-spin' />
                                                        <h2>Generating...</h2>
                                                    </div>
                                                }
                                                <div className='absolute bottom-3 px-5 w-full'>
                                                    <h2>{video?.title}</h2>
                                                    <h2 className='text-sm'>{moment(video?._creationTime).fromNow()}</h2>
                                                </div>
                                            </div>
                        
                                        ) : (
                                            <p className='text-xl'>please wait a minute</p>
                                        )}
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default VideoList