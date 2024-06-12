'use client';

import React, { FC, useEffect, useRef, useState } from "react"
import { useAuth } from "./Auth";
import { useFileUpload } from "./FileUpload";
import axiosInterceptor from "../hooks/axiosInterceptor";
import { useRouter } from "next/navigation";

interface EditProfileContextType {
  isCopied: boolean;
  textLinkRef: React.RefObject<HTMLSpanElement>;
  imageUrl: string;
  fullName: string;
  username: string;
  email: string;
  setImageUrl: (url: string) => void;
  preferredLanguage: string;
  setPreferredLanguage: (language: string) => void;
  copyText: () => void;
  uploadProfileImage: (file: File) => Promise<any>;
  updateUser: () => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EditProfileContext = React.createContext<EditProfileContextType>({} as EditProfileContextType);

export const useEditProfile = () => {
  return React.useContext(EditProfileContext);
}

interface Props {
  children: React.ReactNode;
}

export const EditProfileProvider: FC<Props> = (props: Props) => {
  const [isCopied, setIsCopied] = useState(false)
  const textLinkRef = useRef<HTMLSpanElement>(null)
  const { user, setUser } = useAuth()
  const [imageUrl, setImageUrl] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [preferredLanguage, setPreferredLanguage] = useState<string>('English');
  const { uploadFile } = useFileUpload();
  const router = useRouter();

  useEffect(() => {
    if (!user) return
    setFullName(user.fullName)
    setUsername(user.username)
    setEmail(user.email)
    setImageUrl(user.image)
    setPreferredLanguage(user?.preferredLanguage || 'English')
  }, [user])

  const copyText = () => {
    const textLink = textLinkRef.current?.innerText
    if (textLink) {
      navigator.clipboard.writeText(textLink)
        .then(() => {
          setIsCopied(true)
          setTimeout(() => {
            setIsCopied(false)
          }, 2000)
        })
        .catch(err => {
          console.error('クリップボードへのコピーに失敗しました：', err)
        })
    }
  }

  const uploadProfileImage = async (file: File) => {
    const response = await uploadFile([file])
    return response
  }

  const updateUser = async () => {
    try {
      if (!user) return
      if (!fullName || !username) return
      const response = await axiosInterceptor.put('auth/edit-profile', {
        fullName,
        username,
        image: imageUrl,
        preferredLanguage,
      })

      if (response.data.message === "Success!") {
        setUser(response.data.result)
        router.push('/myprofile')
      }
    } catch (error) {
      console.log('Failed to update user:', error)
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    switch (name) {
      case 'fullName':
        setFullName(value);
        console.log('Full Name:', value);
        break;
      case 'username':
        setUsername(value);
        break;
      default:
        break;
    }
  }

  return (
    <EditProfileContext.Provider
      value={{
        isCopied,
        textLinkRef,
        imageUrl,
        fullName,
        username,
        email,
        setImageUrl,
        preferredLanguage,
        setPreferredLanguage,
        copyText,
        uploadProfileImage,
        updateUser,
        handleOnChange,
      }}
    >
      {props.children}
    </EditProfileContext.Provider>
  )
}