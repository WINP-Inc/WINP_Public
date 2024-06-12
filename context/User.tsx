'use client';
import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from "react";
import axiosInterceptor from "../hooks/axiosInterceptor";
import { useAuth } from "./Auth";
import { useSocket } from "./Socket";
import SecureLocalStorage from "../utils/secureLocalStorage";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

interface userContextType {
    loading: boolean;
    error: string | null;
    follow: (userId: string) => void;
    unfollow: (userId: string) => void;
    editProfile: (fullName: string, dateOfBirth: string, image: string) => void;
}

const userContextDefaultValues: userContextType = {
    loading: false,
    error: null,
    follow: () => { },
    unfollow: () => { },
    editProfile: () => { },
};

const UserContext = createContext<userContextType>(userContextDefaultValues);

export function useUser() {
    return useContext(UserContext);
}

interface Props {
    children: ReactNode;
}

export function UserProvider({ children }: Props) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user, setUser } = useAuth();
    const { socket, socketId } = useSocket();


    useEffect(() => {
        if (socket && socketId && user) {
            socket.emit("join", {
                userId: user?.id,
            });
        }
    }, [socket, socketId, user]);


    const follow = async (userId: string) => {
        try {
            const response = await axiosInterceptor.post(
                `${process.env.NEXT_PUBLIC_API_URL}user/${userId}/follow`, {});
            // setUser(response.data);
        } catch (error: any) {
            console.log(error);
            setError(error.message as string);
        }
    };

    const unfollow = async (userId: string) => {
        try {
            const response = await axiosInterceptor.post(
                `${process.env.NEXT_PUBLIC_API_URL}auth/${userId}/unfollow`, {}
            );
            // setUser(response.data);
        } catch (error: any) {
            console.log(error);
            setError(error.message as string);
        }
    };

    const editProfile = async (fullName: string, dateOfBirth: string, image: string) => {
        try {
            const response = await axiosInterceptor.post(
                `${process.env.NEXT_PUBLIC_API_URL}auth/edit-profile`,
                {
                    fullName: fullName,
                    dateOfBirth: dateOfBirth,
                    image: image,
                }
            );
            if (response.data) {
                setUser(response.data.result);
            }
        } catch (error: any) {
            console.log(error);
            setError(error.message as string);
        }
    };

    return (
        <UserContext.Provider
            value={{
                loading,
                error,
                follow,
                unfollow,
                editProfile,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};