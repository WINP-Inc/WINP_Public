'use client'
import dynamic from "next/dynamic";
import React from 'react'

const AuthResetPassword = dynamic(() => import('../../../components/pages/auth/reset-password/AuthResetPassword'), { ssr: false })

const page = () => {
  return (
    <AuthResetPassword />
  )
}

export default page