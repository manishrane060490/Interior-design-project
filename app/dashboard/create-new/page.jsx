'use client'

import React, { useState } from 'react'
import ImageSelectioon from './_components/ImageSelectioon'
import RoomType from './_components/RoomType'
import DesignType from './_components/DesignType'
import AdditionalReq from './_components/AdditionalReq'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'
import { storage } from '@/config/firebaseConfig'

const page = () => {
    const [formData, setFormData] = useState([]);
    const onHandleInputChange = (value, field) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }))

        
    }

    const generateAIImage = async () => {
        const rawImageUrl = await saveImageToFB();
        const result = await axios.post('/api/redesign-room', {
            imageUrl: rawImageUrl,
            roomType: formData?.roomType,
            designType: formData?.designType,
            additionalReq: formData?.additionalReq
        });
        console.log(result.data);
    }

    const saveImageToFB = async () => {
        const fileName = Date.now()+"_raw.png"

        const imageRef = ref(storage, 'ai-redesign-room/'+fileName);

        await uploadBytes(imageRef, formData.image).then(res => {console.log('file uploaded')})


        const downloadUrl = await getDownloadURL(imageRef);
        console.log(downloadUrl);
        return downloadUrl;
    }
  return (
    <div>
      <h2 className='font-bold text-4xl text-primary text-center'>Experience the Magic on AI for Redesigning the Room</h2>
      <p className='text-center pt-5 text-gray-600'>Transform any room with a click. Select a space, chose style, and watch as AI instantly reimagines your environment</p>

      <div className='grid grid-cols-1 md:grid-cols-2  mt-10 gap-10'>
        <ImageSelectioon imageSelected={(value) => onHandleInputChange(value, 'image')}/>

        <div >
            <RoomType selectRoomType={(value) => onHandleInputChange(value, 'roomType')}/>
            <DesignType selectDesignType={(value) => onHandleInputChange(value, 'designType')}/>
            <AdditionalReq AdditionalReqSubmitted={(value) => onHandleInputChange(value, 'additionalReq')}/>
            <Button className="w-full mt-5" onClick={generateAIImage}>Generate Design</Button>
            <p className='text-sm mb-52 text-gray'>Note: 1 credit will be use to generate design</p>
        </div>
      </div>
    </div>
  )
}

export default page
