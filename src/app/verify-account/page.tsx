'use client'
import { useProtectedRoute } from '@/routes/protectedRoute'
import dynamic from 'next/dynamic'
import React from 'react'

const Verify = dynamic(() => import('../../components/pages/verify/VerifyAccount'), { ssr: false })

const page = () => {
  // const isAuth = useProtectedRoute();

  return (
    <>
      <Verify />
      {/* {isAuth && (
        <MyProfile />
      )} */}
    </>
  )
}

export default page