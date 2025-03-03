import React, { useState } from 'react'

export const options = [
    {
        name: "The Reminder",
        style: " text-blue-300 text-3xl font-bold  px-3 py-1 rounded-md "
    },
    {
        name: "The Motivator",
        style: " text-red-400 text-2xl font-extrabold  px-4 py-2 rounded-lg "
    },
    {
        name: "The Encourager",
        style: "text-green-400 text-lg font-semibold  px-4 py-2 rounded-md "
    },
    {
        name: "The Pusher",
        style: "text-yellow-400 text-lg font-semibold  px-4 py-2 rounded-lg "
    },
    {
        name: "The Game Changer",
        style: "text-purple-300 text-3xl font-bold  px-5 py-2 rounded-lg "
    },
    {
        name: "The Challenger",
        style: " text-pink-400 text-xl font-bold  px-4 py-2 rounded-lg "
    },
    {
        name: "The Growth Mindset",
        style: " bg-gradient-to-r from-indigo-500 to-purple-400 px-5 py-3 rounded-lg bg-clip-text text-transparent font-bold text-xl"
    },
]

const Captions = ({onHandleInputChange}) => {
    const [selectedCaptionStyle,setSelectedCaptionStyle] = useState();
  return (
    <div className='mt-5'>
        <h2>Caption Style</h2>
        <p className='text-sm text-gray-400'>Select Caption Style</p>
        <div className='flex flex-wrap gap-4 mt-2'>
            { options.map((option,index)=> (
                <div key={index} onClick={() => {
                    console.log("Clicked:", option.name);
                    setSelectedCaptionStyle(option.name)
                    onHandleInputChange("caption",option)
                    console.log("options: ",option)
                }} className={`p-2 hover:border bg-slate-900  border-gray-300 cursor-pointer rounded-lg ${selectedCaptionStyle==option.name && 'border'}`}>
                    <h2 className={option.style}>{option.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Captions