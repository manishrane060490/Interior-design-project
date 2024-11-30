"use client"

import Image from 'next/image'
import React, { useState } from 'react'

const ImageSelectioon = ({imageSelected}) => {

    const [file, setFile] = useState();

    const onFileSelected = (e) => {
        console.log('manish')
        setFile(e.target.files[0])
        imageSelected(e.target.files[0])
    }
  return (
    <div>
      <label>Select Image of your room</label>
      <div  className='mt-4'>
        <label htmlFor='upload-image'>
            <div className={`p-30 border rounded-xl border-double flex justify-center border-primary bg-slate-200 cursor-pointer hover:shadow-lg`}>
                {
                    !file ? <Image src={'/upload.png'} height={400} width={400} alt="upload"/> : <Image src={URL.createObjectURL(file)} height={400} width={400} alt={file.name}/>
                }
                
            </div>
        </label>
        <input type="file" accept='image/*' style={{display: 'none'}} id="upload-image" onChange={onFileSelected}/>
      </div>
      
    </div>
  )
}

export default ImageSelectioon
