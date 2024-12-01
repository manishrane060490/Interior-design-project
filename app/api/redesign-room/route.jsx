import { db } from "@/config/db";
import { storage } from "@/config/firebaseConfig";
import { AIGeneratedImage } from "@/config/schema";
import { User } from "@clerk/backend";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import axios from "axios";
import { NextResponse } from "next/server";

import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

export async function POST(req) {
    // return NextResponse.json({result: 'Hello'})

    const { imageUrl, designType, roomType, additionalReq } = await req.json()

    // try{

        // const output = await replicate.run(
        //     "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
        //     {
        //     input: {
        //         image: imageUrl,
        //         prompt: `A ${roomType} with ${designType} and ${additionalReq}`,
        //         guidance_scale: 15,
        //     }
        //     }
        // );

        const output = "https://replicate.delivery/pbxt/vb0LxBEjpVY9LdJqGLlJN9wErCrUowJTD07hkX992UgqMo9E/out.png";
        const base64Image = await ConvertImageToBase64(output);
        const imageFileName = Date.now()+'.png';
        const storageRef = ref(storage, 'ai-redesign-room/'+imageFileName)
        await uploadString(storageRef, base64Image, 'data_url');
        const downloadUrl = await getDownloadURL(storageRef);

        const dbInsert= await db.insert(AIGeneratedImage).values({
            roomType: roomType,
            designType: designType,
            ogImage: imageUrl,
            aiImageUrl: downloadUrl,
            additionalReq: additionalReq,
            userEmail: ''
        }).returning({id: AIGeneratedImage.id})

        return NextResponse.json({result: dbInsert}) 
    // } catch (e) {
    //     return NextResponse.json({error: e})
    // }
}

async function ConvertImageToBase64(imageUrl) {
    const resp = await axios.get(imageUrl, {responseType: "arraybuffer"});
    const base64Image = Buffer.from(resp.data).toString('base64');

    return "data:image/png;base64,"+base64Image
}