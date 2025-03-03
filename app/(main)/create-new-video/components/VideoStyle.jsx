import Image from 'next/image'
import React, { useState } from 'react'

export const options = [
    {
        name: 'Realistic',
        image: '/picture1.jpeg'
    },{
        name: 'Nature',
        image: '/picture2.jpeg'
    },{
        name: 'Love',
        image: '/picture3.jpeg'
    },{
        name: 'Cinematic',
        image: '/picture4.jpeg'
    },{
        name: 'Space',
        image: '/picture5.jpeg'
    }
]

const VideoStyle = ({onHandleInputChange}) => {
    const [selectedStyle,setSelectedStyle] = useState();
  return (
    <div className='mt-5'>
        <h2>Video Styles</h2>
        <p className='text-sm text-gray-400 mb-1'>Select Video Style</p>
        <div className='grid grid-cols-2 lg:grid-cols3 xl:grid-cols-5 gap-2'>
            {
                options.map((option,index) => (
                    <div key={index} className='relative' onClick={()=>{setSelectedStyle(option.name);
                        onHandleInputChange('VideoStyle',option.name)
                    }}>
                        <Image src={option.image} alt={option.name} width={500} height={120}
                        className={`object-cover h-[90px] lg:h-[130px] xl:h-[180px] rounded-lg p-1 hover:border border-gray-300 cursor-pointer 
                            ${option.name == selectedStyle&& 'border'}`}
                        />
                        <h2 className='absolute bottom-1 text-center w-full'>{option.name}</h2>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default VideoStyle