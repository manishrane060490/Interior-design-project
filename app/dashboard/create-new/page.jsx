'use client'

import React, { useState } from 'react'
import ImageSelectioon from './_components/ImageSelectioon'
import RoomType from './_components/RoomType'
import DesignType from './_components/DesignType'
import AdditionalReq from './_components/AdditionalReq'
import { Button } from '@/components/ui/button'

const page = () => {
    const [formData, setFormData] = useState([]);
    const onHandleInputChange = (value, field) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }))

        console.log(formData)
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
            <Button className="w-full mt-5">Generate Design</Button>
            <p className='text-sm mb-52 text-gray'>Note: 1 credit will be use to generate design</p>
        </div>
      </div>
    </div>
  )
}

export default page
