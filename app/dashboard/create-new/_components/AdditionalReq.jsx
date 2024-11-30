import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const AdditionalReq = ({AdditionalReqSubmitted}) => {
  return (
    <div className='mt-4'>
      <label className='text-gray-600'>Additional Requirements (Optional)</label>
      <Textarea className="mt-2" onChange={(e) => AdditionalReqSubmitted(e.target.value)}></Textarea>
    </div>
  )
}

export default AdditionalReq
