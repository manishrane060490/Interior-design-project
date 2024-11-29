'use client'

import { useUser } from '@clerk/clerk-react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { UserDetailContext } from './_context/UserDetailContext';

function Provider({children}) {
  const {user} = useUser();
  const [userDetail, setUserDetail] = useState();

  useEffect(() => {
    user && verifyUser()
  }, [user])


  const verifyUser = async () => {
    const dataResult = await axios.post('/api/verify-user', {
        user: user
    })

    console.log(dataResult.data);
    setUserDetail(dataResult.data.result);
  }

  return (
    <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
        <div>
            {children}
        </div>
    </UserDetailContext.Provider>
  )
}

export default Provider
