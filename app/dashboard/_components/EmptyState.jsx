import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const EmptyState = () => {
  return (
    <div className='flex items-center justify-center mt-10 flex-col gap-5'>
      <Image src={"/3droom.jpg"} width={200} height={200} alt="room" />

      <h2 className='font-medium text-xl text-gray-500'>Create New AI Interior and Redesign your room</h2>

      <Link href={'/dashboard/create-new'}>
        <Button>+ Redesign Room</Button>
      </Link>
    </div>
  )
}

export default EmptyState
