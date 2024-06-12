'use client'
import { useProtectedRoute } from '@/routes/protectedRoute'
import dynamic from 'next/dynamic'
import React from 'react'

const MyProfile = dynamic(() => import('../../components/pages/myprofile/MyProfile'), { ssr: false })

const page = () => {
  // const isAuth = useProtectedRoute();

  return (
    <>
      <MyProfile />
      {/* {isAuth && (
        <MyProfile />
      )} */}
    </>
  )
}

export default page
