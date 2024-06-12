'use client';
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import axiosInterceptor from "../hooks/axiosInterceptor";
import { useSocket } from "./Socket";
import { useAuth } from "./Auth";

type chatContextType = {
    chats: any[] | null;
    getChats: () => void;
    getChatById: (id: string) => void;
    sendMessages: (message: string, sender: string, type: string, id: string) => void;
    loading: boolean;
    error: string | null;
    chat: any | null;
    chatPage: number;
    setChatPage: (page: number) => void;
    setChat: (chat: any) => void;
};

const chatContextDefaultValues: chatContextType = {
    chats: null,
    getChats: () => {},
    getChatById: () => {},
    sendMessages: () => {},
    loading: false,
    error: null,
    chat: null,
    chatPage: 1,
    setChatPage: () => {},
    setChat: () => {},
};

const ChatContext = createContext<chatContextType>(chatContextDefaultValues);

export function useChat() {
    return useContext(ChatContext);
}

type Props = {
    children: ReactNode;
};

export function ChatProvider({ children }: Props) {
    const [chats, setChats] = useState<any[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);
    const [chat, setChat] = useState<any | null>(null);
    const [chatPage, setChatPage] = useState<number>(1);
    const { socket, socketId } = useSocket();
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        if (socket && socketId) {
            socket.on("receive-message", (data: any) => {
                setChat((prevState: { messages: any; }) => {
                    if (prevState) {
                        return {
                            ...prevState,
                            messages: [...prevState.messages, data],
                        };
                    }
                    return null;
                });
            });
        }
    }, [socket, socketId]);

    useEffect(() => {
        if (isAuthenticated) {
            getChats();
        }
    }, [user, isAuthenticated]);

    const getChats = async() => {
        setLoading(true);
        try {
            const res = await axiosInterceptor.get(`/chat?page=${page}&rows=10&field=createdAt&direction=asc`);
            setChats(res.data);
            setLoading(false);
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
            setLoading(false);
        }
    }

    const getChatById = async (id: string) => {
        setLoading(true);
        try {
            const res = await axiosInterceptor.get(`/chat/${id}/messages?page=${chatPage}&rows=10&field=createdAt&direction=asc`);
            setChat(res.data);
            setLoading(false);
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
            setLoading(false);
        }
    };

    const sendMessages = async (message: string, sender: string, type: string, id: string) => {
        setLoading(true);
        try {
            const res = await axiosInterceptor.post(`/chat/${id}/send-message`, {
                message,
                sender,
                type,
            });
            setChat((prevState: { messages: any; }) => {
                if (prevState) {
                    return {
                        ...prevState,
                        messages: [...prevState.messages, res.data],
                    };
                }
                return null;
            });
            setLoading(false);
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
            setLoading(false);
        }
    };

    return (
        <ChatContext.Provider
            value={{
                chats,
                getChats,
                getChatById,
                loading,
                error,
                sendMessages,
                chat,
                chatPage,
                setChatPage,
                setChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}