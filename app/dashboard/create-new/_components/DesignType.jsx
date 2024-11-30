import Image from 'next/image'
import React, { useState } from 'react'

const DesignType = ({selectDesignType}) => {
    const [selectedDesign, setSelectedDesign] = useState();
    const designs = [
        {
            name: 'Modern',
            image: '/modern.jpg'
        },
        {
            name: 'Minimilistic',
            image: '/minimilistic.jpg'
        },
        {
            name: 'Industrial',
            image: '/industrial.jpg'
        },
        {
            name: 'Bohemian',
            image: '/Bohemian.jpg'
        },
        {
            name: 'Traditional',
            image: '/traditional.jpg'
        },
        {
            name: 'Rustic',
            image: '/rustic.jpg'
        }
    ]
  return (
    <div className='mt-3'>
      <label className='text-gray-600'>Interior Design Type</label>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {designs.map((design, index) => (
            <div key={index} onClick={() => {setSelectedDesign(design.name), selectDesignType(design.name)}}>
                <Image src={design.image} alt={design.name} width={100} height={100} className={`h-[70px] rounded-md hover:scale-110 transition-all cursor-pointer ${design.name === selectedDesign && 'border-2 border-primary rounded-md p-1'}`}/>
                <h2>{design.name}</h2>
            </div>
        ))}
      </div>
    </div>
  )
}

export default DesignType
