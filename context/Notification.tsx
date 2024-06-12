'use client';
import { createContext, useContext, ReactNode, useState, useEffect, use } from "react";
import axiosInterceptor from "../hooks/axiosInterceptor";
import SecureLocalStorage from "../utils/secureLocalStorage";
import { useSocket } from "./Socket";
import { useAuth } from "./Auth";

type notificationContextType = {
    notifications: any[] | null;
    getNotifications: () => void;
    loading: boolean;
    error: string | null;
    readNotification: (id: string) => void;
};

const notificationContextDefaultValues: notificationContextType = {
    notifications: null,
    getNotifications: () => { },
    loading: false,
    error: null,
    readNotification: () => { },
};

const NotificationContext = createContext<notificationContextType>(notificationContextDefaultValues);

export function useNotification() {
    return useContext(NotificationContext);
}

type Props = {
    children: ReactNode;
};

export function NotificationProvider({ children }: Props) {
    const [notifications, setNotifications] = useState<any[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { socket, socketId } = useSocket();
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated && user) {
            getNotifications();
            if (Notification.permission === 'granted') {
                navigator.serviceWorker.getRegistration().then((registration) => {
                    if (registration) {
                        registration.showNotification('Hello World!');
                    }
                });
            } else {
                if (navigator.serviceWorker && window.PushManager && window.Notification) {
                    Notification.requestPermission();
                }
            }
        }
    }, [user, isAuthenticated]);

    const getNotifications = async () => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.get(`${process.env.NEXT_PUBLIC_API_URL}notification`);
            if (response.data) {
                setNotifications(response.data.result);
            }
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    const readNotification = async (id: string) => {
        try {
            const response = await axiosInterceptor.put(`${process.env.NEXT_PUBLIC_API_URL}notification/${id}`);
            if (response.data) {
                setNotifications(response.data.result);
            }
        } catch (error: any) {
            setError(error.response.data.message);
        }
    }

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                getNotifications,
                loading,
                error,
                readNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}