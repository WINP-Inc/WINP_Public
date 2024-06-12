import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent, useCallback } from 'react';
import { useAuth } from '../../context/Auth';
import { useSocket } from '../../context/Socket';
import axiosInterceptor from '../axiosInterceptor';

interface IChatRoom {
    title: string;
    description: string;
    members: string[];
    category: string;
    moderators: string[];
    type: string;
    groupImage: string;
}

const RECEIVEGROUPMESSAGE = 'receive-group-message';
const JOINGROUP = 'join-group';
const LEAVEGROUP = 'leave-group';
const ADDMEMBERGROUP = 'add-member-group';

export function useChatRooms(roomId?: string) {
    const [message, setMessage] = useState("");
    const [rooms, setRooms] = useState<any[]>([]);
    const chatAreaRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth();
    const { socket } = useSocket();
    const [chatHistory, setChatHistory] = useState<any[]>([]);
    const [room, setRoom] = useState<any | null>(null);

    useEffect(() => {
        console.log(JSON.stringify(room))
        console.log("admin: " + JSON.stringify(room?.admin))
    }, [room]);

    const getRoom = useCallback(async () => {
        try {
            const { data } = await axiosInterceptor.get(`/group-chat/${roomId}`);
            if (data.message === 'Success') {
                console.log(data.result, 'Room')
                return data.result;
            }
        } catch (error) {
            console.log(error, 'Error getting room');
        }

    }, []);

    const getTotalBalance = (room: any) => {
        const truncatedStr = parseFloat(room.totalBalance).toFixed(5);
        return truncatedStr;
    }

    const init = async () => {
        const room = await getRoom();
        setRoom(room);
        console.log("room; " + room)
        if (room.messages) {
            setChatHistory(room.messages);
        }
        roomId && joinRoom(roomId);
    };

    const onFocusFunction = () => {
        if (roomId) {
            init();
        }
    };

    const onBlurFunction = () => {
        console.log('on blur');
    };

    const addMemberToRoom = async (userId: string) => {
        try {
            await axiosInterceptor.post(`/group-chat/${roomId}/add-member`, {
                userId
            });
        } catch (error) {
            console.error(error, 'Error adding member to room');
        }
    };

    useEffect(() => {
        onFocusFunction();

        window.addEventListener("focus", onFocusFunction);
        window.addEventListener("blur", onBlurFunction);

        return () => {
            onBlurFunction();

            window.removeEventListener("focus", onFocusFunction);
            window.removeEventListener("blur", onBlurFunction);
        };
    }, []);

    useEffect(() => {
        if (!roomId) {
            return
        }

        init();

        return () => {
            setRoom(null);
            leaveRoom();
        }
    }, [roomId, getRoom])

    useEffect(() => {
        if (socket) {
            socket.on(ADDMEMBERGROUP, (data: any) => {
                console.log('Add member to room', data, room);
                if (data.groupId === room?._id) {
                    console.log('Adding member to room', data.user);
                    setRoom((prevRoom: { members: any; }) => {
                        if (prevRoom) {
                            return {
                                ...prevRoom,
                                members: [...prevRoom.members, data.user]
                            }
                        }
                        return prevRoom;
                    });
                }
            });
        }

        return () => {
            if (socket) {
                socket.off(ADDMEMBERGROUP);
            }
        }
    }, [socket]);

    const joinRoom = async (roomId: string) => {
        if (socket) {
            socket.emit(JOINGROUP, {
                roomId: roomId,
            });
        }
    }

    const leaveRoom = async () => {
        if (socket && room) {
            socket.emit(LEAVEGROUP, {
                roomId: room._id,
            });
        }
    }

    useEffect(() => {
        if (socket) {
            socket.on(RECEIVEGROUPMESSAGE, (data: any) => {
                setChatHistory((prevMessages) => [...prevMessages, data.message]);
                if (chatAreaRef.current)
                    chatAreaRef.current.scrollTop = chatAreaRef?.current.scrollHeight;
            });
        }

        return () => {
            if (socket) {
                socket.off(RECEIVEGROUPMESSAGE);
            }
        }
    }
        , [socket])

    useEffect(() => {
        if (socket) {
            socket.on('chat message', (data: any) => {
                setRooms([...rooms, data]);
            });
        }
        return () => {
            if (socket) {
                socket.off('chat message');
            }
        };
    }, [rooms, socket]);

    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const getAllRooms = useCallback(async () => {
        try {
            const { data } = await axiosInterceptor.get('/group-chat');
            if (data.message === 'Success') {
                setRooms(data.result);
            }
        } catch (error) {
            console.error(error, 'Error getting all rooms');
        }
    }, []);

    useEffect(() => {
        getAllRooms();
    }, [getAllRooms]);

    const createRoom = async (roomName: string, category: string) => {
        try {
            const room: IChatRoom = {
                title: roomName,
                description: roomName,
                members: [user._id],
                category,
                moderators: [user._id],
                type: 'public',
                groupImage: user.image
            }
            const response = await axiosInterceptor.post('/group-chat/new', room);
            await getAllRooms();
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const handleMessageInput = ((e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    });

    const sendMessage = async () => {
        try {
            const { data } = await axiosInterceptor.post(`/group-chat/${roomId}/send-message`, {
                message,
                type: 'text',
                sender: user._id
            });
            if (data.message === 'Success') {
                setMessage('');
                console.log('Message sent: ', data)
            }
        } catch (error) {
            console.error(error, 'Error sending message');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            postMessage();
        }
    };

    const postMessage = async () => {
        if (!message.trim()) {
            return;
        }
        if (roomId === '') {
            return;
        }
        await sendMessage();
    };

    return {
        message,
        handleMessageInput,
        chatAreaRef,
        postMessage,
        handleKeyDown,
        rooms,
        createRoom,
        chatHistory,
        room,
        getAllRooms,
        addMemberToRoom,
        getTotalBalance,
    };
}
