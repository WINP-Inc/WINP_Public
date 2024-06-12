'use client'
import { useProtectedRoute } from "@/routes/protectedRoute";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SignInProvider, SignUpProvider } from "../../../context/modal/useAuthModal";
import { useAuth } from "../../../context/Auth";

const Authentication = dynamic(() => import('../../components/pages/auth/Authentication'), { ssr: false })

const Page = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/home')
    }
  }, [isAuthenticated, router])

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
      <SignUpProvider>
        <SignInProvider>
          {!isAuthenticated && (
            <Authentication />
          )}
        </SignInProvider>
      </SignUpProvider>
    </GoogleOAuthProvider>
  )
}

export default Page