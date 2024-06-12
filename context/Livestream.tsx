'use client';
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import axiosInterceptor from "../hooks/axiosInterceptor";
import { useSocket } from "./Socket";
import { useAuth } from "./Auth";
import { getAudienceToken, getSpeakerToken } from "../utils/getLiveToken";
import { LiveStreamRemoteUser, LiveStreamType } from "@/types/community/LiveStreamType";
import { ClientConfig, IAgoraRTCClient, ILocalAudioTrack, ILocalTrack, ILocalVideoTrack, createClient } from 'agora-rtc-react';

type livestreamContextType = {
    livestreams: LiveStreamType[] | null;
    getLivestreams: () => void;
    getLivestreamById: (id: string) => void;
    sendMessage: (message: string, sender: string, type: string, id: string) => void;
    loading: boolean;
    error: string | null;
    livestream: LiveStreamType | null;
    livestreamPage: number;
    setLivestreamPage: (page: number) => void;
    setLivestream: (livestream: any) => void;
    speakers: LiveStreamRemoteUser[] | null;
    audiences: LiveStreamRemoteUser[] | null;
    allRemoteUsers: LiveStreamRemoteUser[] | null;
    joinLivestream: (id: string) => void;
    leaveLivestream: (id: string) => void;
    createLivestream: (title: string, category: string) => void | Promise<any>;
    currentLiveStreamId: string;
    setCurrentLiveStreamId: (id: string) => void;
};

const livestreamContextDefaultValues: livestreamContextType = {
    livestreams: null,
    getLivestreams: () => { },
    getLivestreamById: () => { },
    sendMessage: () => { },
    loading: false,
    error: null,
    livestream: null,
    livestreamPage: 1,
    setLivestreamPage: () => { },
    setLivestream: () => { },
    speakers: null,
    audiences: null,
    allRemoteUsers: null,
    joinLivestream: () => { },
    leaveLivestream: () => { },
    createLivestream: () => { },
    currentLiveStreamId: "",
    setCurrentLiveStreamId: () => { },
};

const LivestreamContext = createContext<livestreamContextType>(livestreamContextDefaultValues);

export function useLivestream() {
    return useContext(LivestreamContext);
}

type Props = {
    children: ReactNode;
};

const RECEIVE_LIVESTREAM_MESSAGE = "receive-livestream-message";
const JOINED_ROOM = "joined-room";
const SPEAKER_JOINED = "speaker-joined";
const JOIN_GROUP = "join-group";
const DISCONNECT = "disconnect";


export function LivestreamProvider({ children }: Props) {
    const [livestreams, setLivestreams] = useState<any[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);
    const [livestream, setLivestream] = useState<any | null>(null);
    const [livestreamPage, setLivestreamPage] = useState<number>(1);
    const [audienceMap, setAudienceMap] = useState<Map<string, LiveStreamRemoteUser>>(new Map());
    const { socket, socketId } = useSocket();
    const [speakersMap, setSpeakersMap] = useState<Map<string, LiveStreamRemoteUser>>(new Map());
    const { user, isAuthenticated } = useAuth();
    const [currentLiveStreamId, setCurrentLiveStreamId] = useState<string>("");

    const speakers = Array.from(speakersMap.values());
    const audiences = Array.from(audienceMap.values());
    const allRemoteUsers = [...speakers, ...audiences];

    useEffect(() => {
        if (socket && socketId) {
            socket.on(RECEIVE_LIVESTREAM_MESSAGE, (data: any) => {
                setLivestream((prevState: { messages: any; }) => {
                    if (prevState) {
                        return {
                            ...prevState,
                            messages: [...prevState.messages, data],
                        };
                    }
                    return null;
                });
            });
            socket.on(JOINED_ROOM, (data: any) => {
                console.log(data, "joined room");
                if (data.speaker) {
                    setSpeakersMap((prevMap) => {
                        const newMap = new Map(prevMap);
                        newMap.set(data.speaker.username, data.speaker);
                        return newMap;
                    });
                } else if (data.audience) {
                    setAudienceMap((prevMap) => {
                        const newMap = new Map(prevMap);
                        newMap.set(data.audience.username, data.audience);
                        return newMap;
                    })
                }
            });
            socket.on(SPEAKER_JOINED, (data: any) => {
                setSpeakersMap((prevMap) => {
                    const newMap = new Map(prevMap);
                    newMap.set(data.speaker.username, data.speaker);
                    return newMap;
                });
            });
            socket.on(DISCONNECT, (data: any) => {
                if (data.speaker) {
                    setSpeakersMap((prevMap) => {
                        const newMap = new Map(prevMap);
                        newMap.delete(data.speaker.username);
                        return newMap;
                    })
                } else if (data.audience) {
                    setAudienceMap((prevMap) => {
                        const newMap = new Map(prevMap);
                        newMap.delete(data.audience.username);
                        return newMap;
                    })
                }
            })
        }
    }, [socket, socketId]);

    const joinGroup = async (id: string) => {
        try {
            if (socket && socketId) {
                socket.emit(JOIN_GROUP, {
                    roomId: id,
                });
            }
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    const joinLivestream = async (id: string) => {
        try {
            console.log(`joinLivestream roomId: ${id}`)
            await joinGroup(id);
            const response = await axiosInterceptor.put(`${process.env.NEXT_PUBLIC_API_URL}liverooms/${id}/join`, {
                userId: user._id,
            });
            if (response.data.message) {
                setCurrentLiveStreamId(id);
            }
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    const leaveLivestream = async (id: string) => {
        try {
            const response = await axiosInterceptor.put(`${process.env.NEXT_PUBLIC_API_URL}liverooms/${id}/leave`, {
                userId: user._id
            });
            if (response.data.message) {
                console.log(response.data.message);
            }
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    }

    useEffect(() => {
        if (user && isAuthenticated) {
            getLivestreams();
        }
    }, [user, isAuthenticated]);

    const getLivestreams = async () => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.get(`${process.env.NEXT_PUBLIC_API_URL}liverooms`);
            if (response.data) {
                setLivestreams(response.data.result);
            }
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const getLivestreamById = async (id: string) => {
        console.log(`getLivestream roomId: ${id}`)
        try {
            setLoading(true);
            const response = await axiosInterceptor.get(`${process.env.NEXT_PUBLIC_API_URL}liverooms/${id}`);
            if (response.data) {
                setLivestream(response.data.result);
            }
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    }

    const sendMessage = async (message: string, sender: string, type: string, id: string) => {
        try {
            if (socket && socketId) {
                socket.emit("send-livestream-message", {
                    message,
                    sender,
                    type,
                    id,
                });
            }
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    const createLivestream = async (title: string, category: string) => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.post(`${process.env.NEXT_PUBLIC_API_URL}liverooms`, {
                title,
                category,
            });
            console.log(response, 'full response')
            if (response.data) {
                console.log(response.data, 'response data')
                const { liveRoomId } = response.data;
                await joinLivestream(liveRoomId);
                setLoading(false);
                return liveRoomId;
            } else {
                console.log('No response data')
            }
        } catch (error: any) {
            console.error('An error occurred:', error);
            if (error.response) {
                setError(error.response.data.message);
                setLoading(false);
            }
        }
    };

    return (
        <LivestreamContext.Provider
            value={{
                livestreams,
                getLivestreams,
                getLivestreamById,
                sendMessage,
                loading,
                error,
                livestream,
                livestreamPage,
                setLivestreamPage,
                setLivestream,
                speakers,
                audiences,
                allRemoteUsers,
                joinLivestream,
                leaveLivestream,
                createLivestream,
                currentLiveStreamId,
                setCurrentLiveStreamId
            }}
        >
            {children}
        </LivestreamContext.Provider>
    );
}