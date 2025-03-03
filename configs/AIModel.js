const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  console.log("gemini api key: ",apiKey)
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
 
   export const generateScript = model.startChat({
      generationConfig,
      // history: [
      //   {
      //     role: "user",
      //     parts: [
      //       // {text: "write a two different script for 30 seconds video on topic: kids story,\ngive me response in json format and follow the schema\n-{\nscripts:[\n{\ncontent:\"\n},\n],\n}"},
      //     ],
      //   },
      //   {
      //     role: "model",
      //     parts: [
      //       // {text: "```json\n{\n  \"scripts\": [\n    {\n      \"content\": \"**(Scene: A whimsical forest with cartoon animals)**\\n\\n**(Narrator, upbeat and friendly):** Once upon a time, in a bright and sunny forest, lived a little squirrel named Squeaky. Squeaky loved to collect acorns, but he was always losing them! One sunny afternoon...\\n\\n**(Sound of acorns scattering)**\\n\\n**(Narrator):** ...he dropped his whole bag!  Uh oh!  Where did they go?  He looked under a mushroom...\\n\\n**(Sound of rustling leaves)**\\n\\n**(Narrator):** ...behind a big tree...\\n\\n**(Sound of chirping birds)**\\n\\n**(Narrator):** ...and even asked a friendly bird, but no acorns!  Just when he was about to give up...\\n\\n**(Sound of a happy squeak)**\\n\\n**(Narrator):** ...he found them! They'd rolled right into his cozy little home! Squeaky learned that sometimes, the best things are right where you least expect them!\"\n    },\n    {\n      \"content\": \"**(Scene: Animation of a child's bedroom, toys scattered)**\\n\\n**(Narrator, gentle and calming):** Lily loved her teddy bear, Barnaby. One day, Barnaby went missing! Lily looked everywhere. Under the bed...\\n\\n**(Sound of a drawer opening and closing)**\\n\\n**(Narrator):** ...in her toy chest...\\n\\n**(Sound of blocks clattering)**\\n\\n**(Narrator):** ...even behind her giant stuffed giraffe!  Tears welled up in her eyes. Where could Barnaby be? Then, she looked up...\\n\\n**(Gentle lullaby music starts)**\\n\\n**(Narrator):** ...and there he was!  Tucked safely in her arms, just where he belonged. Lily gave Barnaby a big hug.  Sometimes, what we're looking for is closer than we think.\"\n    }\n  ]\n}\n```"},
      //     ],
      //   },
      // ],
    });

    export const GenerateImageScript = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Image prompt of Cinematic style with all details for each scene for 30 seconds video : script: Rosa Parks refused to give up her seat on a bus in 1955. Her quiet act of defiance sparked the Montgomery Bus Boycott, a pivotal moment in the Civil Rights Movement. One person’s bravery can inspire lasting change for everyone.\n\nJust Give specific image prompt depending on the story line\nDo not give camera angle image prompt\nFollow the following schema and return JSON data (Max 4-5 Images)\n[\n  {\n    \"imagePrompt\": \"\",\n    \"sceneContent\": \"<Script Content>\"\n  }\n]\n\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I am only capable of generating or editing pixel-based images for early testers currently. I am able to provide image prompts for a 30-second video based on your script about Rosa Parks. Here's the JSON data with specific image prompts for each scene:\n\n```json\n[\n  {\n    \"imagePrompt\": \"A crowded city bus in 1955 Montgomery, Alabama. Rosa Parks, a Black woman with a weary but determined expression, sits quietly in a seat in the 'colored' section. Other passengers are visible, some looking uncomfortable or disapproving. Soft, diffused light filters through the bus windows, highlighting the segregation era atmosphere.\",\n    \"sceneContent\": \"Rosa Parks refused to give up her seat on a bus in 1955.\"\n  },\n  {\n    \"imagePrompt\": \"Close-up on Rosa Parks' hands, clasped together but tense. Her eyes are focused straight ahead, a mix of apprehension and resolve in her gaze. The focus is on the quiet strength and defiance within her. Grainy texture to emphasize the historical context.\",\n    \"sceneContent\": \"Her quiet act of defiance\"\n  },\n  {\n    \"imagePrompt\": \"A wide shot of the Montgomery bus boycott in full swing. Black citizens are walking, carpooling, or riding bicycles instead of taking the bus. The mood is somber yet determined. Banners and signs with slogans advocating for equality are visible. A sense of community and solidarity permeates the scene.\",\n    \"sceneContent\": \"sparked the Montgomery Bus Boycott, a pivotal moment in the Civil Rights Movement.\"\n  },\n  {\n    \"imagePrompt\": \"A montage of historical images showcasing the impact of the Civil Rights Movement. Peaceful protests, marches, and eventually, legislative victories. The final image is a diverse group of people standing together, symbolizing equality and progress. Uplifting and hopeful tone.\",\n    \"sceneContent\": \"One person’s bravery can inspire lasting change for everyone.\"\n  }\n]\n```\n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
  