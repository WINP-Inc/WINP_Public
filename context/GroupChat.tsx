'use client';
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import axiosInterceptor from "../hooks/axiosInterceptor";
import { useSocket } from "./Socket";
import { useAuth } from "./Auth";

type groupChatContextType = {
    groupChats: any[] | null;
    getGroupChats: () => void;
    getGroupChatById: (id: string) => void;
    sendMessages: (message: string, sender: string, type: string, id: string) => void;
    loading: boolean;
    error: string | null;
    groupChat: any | null;
    groupChatPage: number;
    setGroupChatPage: (page: number) => void;
};

const groupChatContextDefaultValues: groupChatContextType = {
    groupChats: null,
    getGroupChats: () => { },
    getGroupChatById: () => { },
    sendMessages: () => { },
    loading: false,
    error: null,
    groupChat: null,
    groupChatPage: 1,
    setGroupChatPage: () => { },
};

const GroupChatContext = createContext<groupChatContextType>(groupChatContextDefaultValues);

export function useGroupChat() {
    return useContext(GroupChatContext);
}

type Props = {
    children: ReactNode;
};

export function GroupChatProvider({ children }: Props) {
    const [groupChats, setGroupChats] = useState<any[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);
    const [groupChat, setGroupChat] = useState<any | null>(null);
    const [groupChatPage, setGroupChatPage] = useState<number>(1);
    const { socket, socketId } = useSocket();
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        if (socket && socketId) {
            socket.on("receive-group-message", (data: any) => {
                setGroupChat((prevState: { messages: any; }) => {
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

    const joinGroupChat = async (id: string) => {
        if (socket && socketId) {
            socket.emit("join-group", {
                socketId: socketId,
                groupId: id,
            });
        }
    };

    const getGroupChats = async () => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.get(`${process.env.NEXT_PUBLIC_API_URL}group-chat?page=${page}`);
            if (response.data) {
                setGroupChats(response.data.result);
            }
        } catch (error: any) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    const getGroupChatById = async (id: string) => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.get(`${process.env.NEXT_PUBLIC_API_URL}group-chat/${id}`);
            if (response.data) {
                setGroupChat(response.data.result);
            }
        } catch (error: any) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    const sendMessages = async (message: string, sender: string, type: string, id: string) => {
        try {
        } catch (error: any) {
            setError(error.response.data.message);
        }
    }

    return (
        <GroupChatContext.Provider
            value={{
                groupChats,
                getGroupChats,
                getGroupChatById,
                sendMessages,
                loading,
                error,
                groupChat,
                groupChatPage,
                setGroupChatPage,
            }}
        >
            {children}
        </GroupChatContext.Provider>
    );
};