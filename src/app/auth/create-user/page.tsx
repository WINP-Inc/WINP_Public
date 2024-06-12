'use client'
import dynamic from "next/dynamic";
import React from 'react'
const CreateUser = dynamic(() => import('../../../components/pages/auth/create-user/CreateUser'), { ssr: false });

const page = () => {
  return (
    <CreateUser />
  )
}

export default page
