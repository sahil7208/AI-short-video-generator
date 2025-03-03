"use client"
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '../../../../components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Loader2Icon, SparklesIcon } from 'lucide-react'
import { useAuthContext } from '@/app/provider'

const suggestions = [
    "AI Trends & Future Predictions",
    "Top 5 Life Hacks You Didn’t Know",
    "Viral TikTok Challenges Compilation",
    "Quick Science Experiments You Can Try",
    "History in 60 Seconds",
    "AI Explained in Simple Terms",
    "Movie Facts You Didn’t Know",
    "Behind-the-Scenes of Your Favorite Shows",
    "How to Stay Motivated in 60 Seconds",
    "Why You Should Start Now, Not Later",
    "Relatable Struggles We All Face",
    "Funniest AI-Generated Memes",
]


const Topic = ({onHandleInputChange}) => {
    const [selectTopic, setSelectedTopic] = useState("")
    console.log("selected topic: ",selectTopic)
    const [script,setScript] = useState();
    const [loading, setLoading] = useState(false);
    const [selectedScriptIndex, setSelectedScriptIndex] = useState();
    const {user} = useAuthContext();

    const GenerateScript = async () => {
        if(user?.credits <= 0){
            alert('Plese add more credits')
            return;
          }
        setLoading(true);
        setSelectedScriptIndex(null);
        try{
        const result = await axios.post('/api/generate-script',{
            topic:selectTopic
        })
        console.log(result.data)
        setScript(result.data?.scripts)
    }catch(e){
        console.log(e);
    }
        setLoading(false)
    }
  return (
    <div>
        <h2 className='mb-1'>Project Title</h2>
        <Input placeholder="Enter project Title" onChange={(event)=>onHandleInputChange('title',event?.target.value)}/>
        <h2 className='mt-5'>
            Video Topic
        </h2>
        <p className='text-sm text-gray-600'>Select Topic for Video</p>
        <Tabs defaultValue="suggestion" className="w-full  mt-2">
  <TabsList>
    <TabsTrigger value="suggestion">Suggestions</TabsTrigger>
    <TabsTrigger value="your_topic">Your Topic</TabsTrigger>
  </TabsList>
  <TabsContent  value="suggestion"><div>
    {
        suggestions.map((suggestion,index) => (
            <Button onClick={()=>{setSelectedTopic(suggestion)
                 onHandleInputChange("topic",suggestion)}} className={`m-1 ${suggestion==selectTopic && 'bg-secondary'}`} variant="outline" key={index}>{suggestion}</Button>
        ))
    }
    </div></TabsContent>
  <TabsContent value="your_topic">
    <div >
        <h2>Enter your own topic</h2>
        <Textarea placeholder="Enter your topic" onChange={(event) => onHandleInputChange("topic",event.target.value)}/>
    </div>
  </TabsContent>
</Tabs>

{
    script?.length > 0 && 
    <div className='mt-3'>
        <h2>Select the Script</h2>
    <div className='grid grid-cols-2 gap-5 mt-1'>
        {
            script.map((item,index) => (
                <div key={index} className={`p-3 border rounded-lg cursor-pointer ${selectedScriptIndex === index && 'bg-secondary border-white '}`}
                onClick={() => {setSelectedScriptIndex(index)
                    onHandleInputChange("script",item.content)
                }}>
                    <h2 className='line-clamp-4 text-sm text-gray-300'>{item.content}</h2>
                    </div>
            ))
        }
    </div>
    </div>
}
{!script && 
    <Button disabled={loading} onClick={GenerateScript} className="mt-3" size="sm">{loading ? <Loader2Icon className='animate-spin'/> : <SparklesIcon/>}Generate Script</Button>
}
    </div>
  )
}

export default Topic