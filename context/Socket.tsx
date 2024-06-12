'use client';
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import io from "socket.io-client";
import { useAuth } from "./Auth";
import SecureLocalStorage from "../utils/secureLocalStorage";

type socketContextType = {
    socket: any;
    connect: () => void;
    disconnect: () => void;
    socketId: string;
    setSocketId: (socketId: string) => void;
};

const socketContextDefaultValues: socketContextType = {
    socket: null,
    connect: () => { },
    disconnect: () => { },
    socketId: "",
    setSocketId: () => { },
};

const SocketContext = createContext<socketContextType>(socketContextDefaultValues);

export function useSocket() {
    return useContext(SocketContext);
}

type Props = {
    children: ReactNode;
};

export function SocketProvider({ children }: Props) {
    const [socket, setSocket] = useState<any>(null);
    const [socketId, setSocketId] = useState<string>("");
    const { isAuthenticated, user } = useAuth();

    const connect = () => {
        if (isAuthenticated && user) {
            const token = SecureLocalStorage().get("accessToken");
            try {
                const newSocket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, {
                    query: {
                        token: token,
                        userId: isAuthenticated ? SecureLocalStorage().get("userId") : "",
                    },
                    transports: ["websocket"],
                    reconnectionAttempts: 30,
                    reconnectionDelay: 2000,
                    reconnection: true,
                });

                newSocket.on("connect", () => {
                    setSocket(newSocket);
                    if (newSocket.id) {
                        setSocketId(newSocket.id);
                    }
                });
            } catch (error) {
                console.log("error", error);
            }
        }
    };

    const join = (id: string) => {
        if (socket && socketId) {
            socket.emit("join", {
                socketId: socketId,
                userId: id,
            });
        }
    };

    useEffect(() => {
        if (socket && socketId && user) {
            join(user._id);
        }
    }, [socket, socketId, user]);

    const disconnect = () => {
        if (socket) {
            socket.disconnect();
            setSocket(null);
        }
    };

    useEffect(() => {
        connect();

        return disconnect;
    }, [isAuthenticated]);

    return (
        <SocketContext.Provider
            value={{
                socket,
                connect,
                disconnect,
                socketId,
                setSocketId,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
}