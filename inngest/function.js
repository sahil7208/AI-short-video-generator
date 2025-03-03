import { inngest } from "./client";
import axios from "axios";
import { createClient } from "@deepgram/sdk";
import { GenerateImageScript } from "@/configs/AIModel";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { getServices } from "@remotion/cloudrun/client";
import { renderMediaOnCloudrun} from '@remotion/cloudrun/client';

const ImagePrompt = `Generate Image prompt of {style} style with all details for each scene for 30 seconds video : script:{script} 
- Just Give specifing image prompt depends on the story line.
- do not give camera angle image prompt.
- Follow the following schema and return JSON data (Max 4-5 Images)
[
{
imagePrompt:'',
sceneContent: '<Script Content>'
}
]`

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

const BASE_URL='https://aigurulab.tech';
export const GenerateVideoData = inngest.createFunction(
  {id:'generate-video-data'},
  {event:'generate-video-data'},
  async({event,step}) => {
    const {script, topic, title, caption, VideoStyle, voice, recordId} = event?.data;
    console.log("serve url: ",process.env.GCP_SERVE_URL)
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL)

    const GenerateAudioFile = await step.run(
      "GenerateAudioFile",
      async () => {
        const result = await axios.post(BASE_URL+'/api/text-to-speech',
          {
              input: script,
              voice: voice
          },
          {
              headers: {
                  'x-api-key': process.env.NEXT_PUBLIC_AIGURULAB_API_KEY, // Your API Key
                  'Content-Type': 'application/json', // Content Type
              },
          })
       console.log(result.data.audio) //Output Result: Audio Mp3 Url
        return result.data.audio;
     
      }
    )

    const GenerateCaptions = await step.run(
      "generatedCaptions",
      async () => {
        const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);

        const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
          { url: GenerateAudioFile },
          {
            model: "nova-3",
          //  smart_format: true,
          },
        );
        return result.results?.channels[0]?.alternatives[0]?.words;
      }
    )

    
      
      const GenerateImagePrompts = await step.run("generateImagePrompt", async () => {
        const FINAL_PROMPT = ImagePrompt.replace("{style}", VideoStyle).replace("{script}", script);
       
        const result = await GenerateImageScript.sendMessage(FINAL_PROMPT);
        const responseText =  result?.response?.text();
       
        const cleanedResponse = responseText.replace(/```json\n?/, "").replace(/\n?```/, "");
        return JSON.parse(cleanedResponse);
      });
      
      const GenerateImages = await step.run(
        "generateImages",
        async () => {
          let images = [];
          images = await Promise.all(
            GenerateImagePrompts.map(async(element) => {
              const result = await axios.post(BASE_URL+'/api/generate-image',
                {
                    width: 1024,
                    height: 1024,
                    input: element.imagePrompt,
                    model: 'sdxl',//'flux'
                    aspectRatio:"1:1"//Applicable to Flux model only
                },
                {
                    headers: {
                        'x-api-key': process.env.NEXT_PUBLIC_AIGURULAB_API_KEY, // Your API Key
                        'Content-Type': 'application/json', // Content Type
                    },
                })
        console.log(result.data.image) //Output Result: Base 64 Image
        return result.data.image;
            })
          )
          return images;
        }
      )

      const UpdateDB = await step.run(
        'UpdateDB', 
        async () => {
          const result = await convex.mutation(api.videoData.UpdateVideoRecord,{
            recordId: recordId,
            audioUrl: GenerateAudioFile,
            captionJson: GenerateCaptions,
            images: GenerateImages
          })
          return result;
        }
      )

      // const RenderVideo = await step.run(
      //   "renderVideo",
      //   async()=>{
      //     const services = await getServices({
      //       region: "us-east1",
      //       compatibleOnly: true,
      //     });
      //     console.log("Available services:", services);
      //     if (!services || services.length === 0) {
      //       throw new Error("No Cloud Run services found! Check your Remotion setup.");
      //     }
           
      //     const serviceName = services[0].serviceName;
      //     const result = await renderMediaOnCloudrun({
      //       serviceName,
      //       region: 'us-east1',
      //       serveUrl: process.env.GCP_SERVE_URL,
      //       composition: 'youtubeShort',
      //       inputProps: {},
      //       codec: 'h264',
      //       //updateRenderProgress,
      //     });
           
      //     if (result.type === 'success') {
      //       console.log(result.bucketName);
      //       console.log(result.renderId);
      //     }
      //     return result?.publicUrl;
      //   }
      // )

    //return GenerateAudioFile
    //return GenerateCaptions;
    //return GenerateImagePrompts
    //return GenerateImages
    return UpdateDB;
  }
)


