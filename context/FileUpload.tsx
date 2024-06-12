'use client';
import React from "react";
import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from "react";
import axiosInterceptor from "../hooks/axiosInterceptor";
import toast from 'react-hot-toast';
import { mediaType } from "@/types/post/postType";

type fileUploadContextType = {
    uploadFile: (files: any) => any;
    loading: boolean;
    error: string | null;
    uploadProgress: number;
};

const fileUploadContextDefaultValues: fileUploadContextType = {
    uploadFile: () => { },
    loading: false,
    error: null,
    uploadProgress: 0,
};

const FileUploadContext = createContext<fileUploadContextType>(fileUploadContextDefaultValues);

export function useFileUpload() {
    return useContext(FileUploadContext);
}

type Props = {
    children: ReactNode;
};

var fileExtensionsPattern = /\.(jpe?g|png|gif|bmp|mp4|avi|mkv|mov|flv|mp3|wav|ogg|aac|flac)$/i;

function isImageVideoOrAudio(filename: string) {
    return fileExtensionsPattern.test(filename);
}

export function FileUploadProvider({ children }: Props) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const uploadFile = async (files: any) => {
        setLoading(true);
        console.log("files", files)
        try {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                if (!isImageVideoOrAudio(files[i].name)) {
                    console.error("Please select a valid file", files[i]);
                    console.log('stop iteration')
                    return;
                }
                formData.append("files", files[i]);
            }
            const response = await axiosInterceptor.post(
                "file-uploads",
                formData,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent && progressEvent.total) {
                            const progress = Math.round(
                                (progressEvent.loaded * 100) / progressEvent.total
                            );
                            setUploadProgress(progress);
                        }
                    },
                },
            );
            setLoading(false);
            if (response.data.message) {
                return response.data.result;
            } else {
                throw new Error("Something went wrong");
            }
        } catch (error: any) {
            setLoading(false);
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <FileUploadContext.Provider
            value={{
                uploadFile,
                loading,
                error,
                uploadProgress
            }}
        >
            {children}
        </FileUploadContext.Provider>
    );
}