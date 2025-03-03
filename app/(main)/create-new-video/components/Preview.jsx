import Image from 'next/image'
import React from 'react'
import { options } from './VideoStyle'

const Preview = ({formData}) => {
    console.log("formdata at preview: ",formData)
    const selectVideoStyle = formData && options.find((item => item.name == formData?.VideoStyle))
    console.log("selectvideostyle: ",selectVideoStyle)
    
  return (
    <div>
        {selectVideoStyle &&  (
          <div className='relative'>
            <h2 className='mb-3 text-2xl'>Preview</h2>
            <Image
              src={selectVideoStyle?.image}
              alt={selectVideoStyle?.name}
              width={1000}
              height={300}
              className='w-full h-[70vh] object-cover rounded-xl'
            /> 
            {formData.caption && 
             <h2 className={`${formData?.caption?.style} absolute bottom-7 text-center w-full`}>{formData?.caption?.name}</h2>
            }
           
          </div>
        )}
       
       
    </div>
  )
}

export default Preview