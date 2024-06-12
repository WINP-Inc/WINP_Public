'use client';
import { createContext, useContext, ReactNode, useState, useEffect, useRef } from "react";
import { useAuth } from "./Auth";
import axiosInterceptor from "../hooks/axiosInterceptor";
import { useSocket } from "./Socket";
import { UserType } from "@/types/user/UserType";

interface SystemChatMessage {
    content: string;
    time: Date;
    user: 'SYSTEM' | 'USER';
}

interface SystemChatType {
    messages: SystemChatMessage[];
    roomName: string;
    user: UserType;
    createdAt?: string;
    updatedAt?: string;
}

type systemChatContextType = {
    systemChats: SystemChatType[] | null;
    getSystemChats: () => void;
    getSystemChatById: (id: string) => void;
    createSystemChat: (roomId: string, prompt: string) => void;
    systemChat: SystemChatType | null;
}

const systemChatContextDefaultValues: systemChatContextType = {
    systemChats: null,
    getSystemChats: () => { },
    getSystemChatById: () => { },
    createSystemChat: () => { },
    systemChat: null,
};

const SystemChatContext = createContext<systemChatContextType>(systemChatContextDefaultValues);

export function useSystemChat() {
    return useContext(SystemChatContext);
}

type Props = {
    children: ReactNode;
};

export function SystemChatProvider({ children }: Props) {
    const [systemChats, setSystemChats] = useState<SystemChatType[] | null>(null);
    const [systemChat, setSystemChat] = useState<SystemChatType | null>(null);
    const { user, isAuthenticated } = useAuth();
    const [error, setError] = useState<any | null>(null);
    const { socket, socketId } = useSocket();
    const [tempResult, setTempResult] = useState<string>('');

    useEffect(() => {
    }, [tempResult])

    useEffect(() => {
    }, [systemChat])

    useEffect(() => {
    }, [socket, socketId])

    useEffect(() => {
        getSystemChats();
    }, [])

    useEffect(() => {
        if (socket && socketId) {
            socket.on('receive-system-message', (data: any) => {
                setSystemChat((prevState) => {
                    if (!prevState || prevState.messages.length === 0) {
                        return prevState;
                    }

                    const updatedMessages = prevState.messages.map((message, index) => {
                        if (index === prevState.messages.length - 1) {
                            return { ...message, content: `${message.content}${data}` };
                        }
                        return message;
                    });

                    return {
                        ...prevState,
                        messages: updatedMessages,
                    };
                });
            });
        }
    }, [socket, socketId]);

    const getSystemChats = async () => {
        try {
            const response = await axiosInterceptor.get(`${process.env.NEXT_PUBLIC_API_URL}system-chat`);
            if (response.data) {
                setSystemChats(response.data.result);
            }
        } catch (error) {
            setError(error);
        }
    };

    const getSystemChatById = async (id: string) => { };

    const createSystemChat = async (roomId: string, prompt: string) => {
        try {
            setSystemChat((prevState) => ({
                ...prevState,
                roomName: prevState?.roomName || "Default Room",
                user: user,
                messages: [
                    ...prevState?.messages || [],
                    { content: prompt, time: new Date(), user: 'USER' },
                ]
            }))
            const response = await axiosInterceptor.post(`${process.env.NEXT_PUBLIC_API_URL}system-chat/ask?roomId=${roomId}`, {
                prompt,
            });
            if (response.data) {
                setSystemChat((prevState) => ({
                    ...prevState,
                    roomName: prevState?.roomName || "Default Room",
                    user: user,
                    messages: [
                        ...prevState?.messages || [],
                        { content: '', time: new Date(), user: 'SYSTEM' },
                    ]
                }))
            }
        } catch (error) {
            setError(error);
        }
    };


    return (
        <SystemChatContext.Provider
            value={{
                systemChats,
                getSystemChats,
                getSystemChatById,
                createSystemChat,
                systemChat,
            }}
        >
            {children}
        </SystemChatContext.Provider>
    );
}