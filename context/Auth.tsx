'use client';
import { useRouter } from 'next/navigation';
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import axiosInterceptor from "../hooks/axiosInterceptor";
import { getBrowser, getCity, getCountry, getDeviceName, getLocationInfo, getOS, getRegion, getUserAgent, ipAddress, isMobile } from "../utils/deviceInfo";
import SecureLocalStorage from "../utils/secureLocalStorage";
import { useSignInModal } from './modal/useAuthModal';

type authContextType = {
    success: boolean;
    login: () => void;
    logout: () => void;
    user: any;
    setUser: (user: any) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: string | null;
    signup: () => Promise<any>;
    requestMessage: ({ address, chain }: { address: string; chain: string }) => Promise<any>;
    verifyAccount: ({ email, code }: { email: string; code: string }) => Promise<boolean | undefined>;
    walletLogin: ({ message, signature, chainId }: { message: string; signature: string, chainId: number }) => void;
    googleLogin: ({ code }: { code: string }) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    fullName: string;
    setFullName: (fullName: string) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    sendResetPasswordEmail?: (email: string) => void;
    resetPassword?: (password: string, code: string, email: string) => void;
    changePassword?: (password: string, confirmPassword: string, newPassword: string) => void;
    setUpTwoFactorAuthentication?: () => void;
    qrImage?: string;
    verifyTwoFactorAuthentication: (authCode: string) => void;
    twoFactorAuthentication?: boolean;
    validateTwoFactorAuthentication: (authCode: string) => void;
    saveWalletDetails: (walletAddress: string, chainId: number) => void;
};

type deviceInfo = {
    isMobile: boolean;
    deviceName: string;
    os: string;
    browser: string;
    ip: string;
    country: string | null;
    city: string | null;
    region: string | null;
    latitude: number | null;
    longitude: number | null;
    userAgent: string;
};

const authContextDefaultValues: authContextType = {
    success: false,
    login: () => { },
    logout: () => { },
    user: null,
    setUser: () => { },
    loading: false,
    setLoading: () => { },
    error: null,
    signup: () => new Promise<any>(() => { }),
    googleLogin: () => { },
    requestMessage: () => new Promise<any>(() => { }),
    verifyAccount: () => new Promise<boolean | undefined>(() => { }),
    walletLogin: () => { },
    email: "",
    setEmail: () => { },
    password: "",
    setPassword: () => { },
    fullName: "",
    setFullName: () => { },
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    sendResetPasswordEmail: () => { },
    resetPassword: () => { },
    changePassword: () => { },
    setUpTwoFactorAuthentication: () => { },
    qrImage: "",
    verifyTwoFactorAuthentication: () => { },
    twoFactorAuthentication: false,
    validateTwoFactorAuthentication: () => { },
    saveWalletDetails: () => { },
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [success, setSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [region, setRegion] = useState<string>("");
    const [qrImage, setQRImage] = useState<string>("");
    const [twoFactorAuthentication, setTwoFactorAuthentication] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const { disconnectAsync, isConnected } = useSignInModal();
    const router = useRouter();

    useEffect(() => {
        setEmail('');
        setPassword('');
        checkLocalStorage();
    }, []);

    const checkLocalStorage = async () => {
        const accessToken = SecureLocalStorage().get("accessToken")
        const refreshToken = SecureLocalStorage().get("refreshToken")

        if (accessToken && refreshToken) {
            await getUser();
            setIsAuthenticated(true);
        }
    }

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
    async function successResult(pos: any) {
        var crd = pos.coords;
        setLatitude(crd?.latitude);
        setLongitude(crd?.longitude);
        const result = await getLocationInfo(crd?.latitude, crd?.longitude)
        setCity(result?.locality);
        setCountry(result?.countryName);
        setRegion(result?.city);
    }

    function errors(err: any) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    if (result.state === "granted") {
                        navigator.geolocation.watchPosition(successResult, errors, options);
                    } else if (result.state === "prompt") {
                        navigator.geolocation.watchPosition(successResult, errors, options);
                    } else if (result.state === "denied") {
                    }
                });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    const getDeviceInfo = async () => {
        const deviceInfo: deviceInfo = {
            isMobile: isMobile(),
            deviceName: getDeviceName(),
            os: getOS(),
            browser: getBrowser(),
            ip: await ipAddress(),
            country: country ? country : await getCountry(),
            city: city ? city : await getCity(),
            region: region ? region : await getRegion(),
            latitude: latitude ? latitude : null,
            longitude: longitude ? longitude : null,
            userAgent: getUserAgent(),
        };
        return deviceInfo;
    };

    const signup = async () => {
        try {
            const response = await axiosInterceptor.post(`${process.env.NEXT_PUBLIC_API_URL}auth/sign-up`, {
                email,
                password,
                deviceInfo: await getDeviceInfo(),
            });
            return response.data;
        } catch (error: any) {
            console.log(error.response);
            return error.response.data.message;
        } finally {
            setEmail("");
            setPassword("");
        }
    };

    const requestMessage = async ({ address, chain }: { address: string; chain: string }) => {
        try {
            console.log(address, chain);
            const response = await axiosInterceptor.post(`${process.env.NEXT_PUBLIC_API_URL}auth/wallet-request-message`, {
                address,
                chain,
            });
            return response.data;
        } catch (error: any) {
            return error.response.data.message;
        }
    };

    const walletLogin = async ({ message, signature, chainId }: { message: string; signature: string, chainId: number }) => {
        try {
            const response = await axiosInterceptor.post(`${process.env.NEXT_PUBLIC_API_URL}auth/wallet-login`, {
                message,
                signature,
                chainId
            });
            if (response.data.accessToken) {
                SecureLocalStorage().set("accessToken", response.data.accessToken)
                SecureLocalStorage().set("refreshToken", response.data.refreshToken)
                axiosInterceptor.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
                await getUser();
            }
            setLoading(false);
            setSuccess(true);
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError(error.message as string);
            }
            setLoading(false);
        }
    };

    const login = async () => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.post(`${process.env.NEXT_PUBLIC_API_URL}auth/sign-in`, {
                email,
                password,
                deviceInfo: await getDeviceInfo(),
            });
            if (response.data.accessToken) {
                SecureLocalStorage().set("accessToken", response.data.accessToken)
                SecureLocalStorage().set("refreshToken", response.data.refreshToken)
                axiosInterceptor.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
                await getUser();
                setSuccess(true);
            }
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError(error.message as string);
            }
        } finally {
            setLoading(false);
            setEmail("");
            setPassword("");
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.post(`${process.env.NEXT_PUBLIC_API_URL}auth/sign-out`);
            if (response.status === 200) {
                window.location.href = '/'
                SecureLocalStorage().remove("accessToken")
                SecureLocalStorage().remove("refreshToken")
                SecureLocalStorage().remove("userId")
                axiosInterceptor.defaults.headers.common["Authorization"] = "";
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error: any) {
            console.log(error.response);
            if (error.response) {
                setError(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const sendResetPasswordEmail = async (email: string) => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.post(`${process.env.NEXT_PUBLIC_API_URL}auth/reset-password/send`, {
                email,
            });
            setLoading(false);
            if (response.data) {
                SecureLocalStorage().set("messageId", response.data.messageId)
            }
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    const resetPassword = async (password: string, code: string, email: string) => {
        try {
            setLoading(true);
            const messageId = SecureLocalStorage().get("messageId")
            const response = await axiosInterceptor.post(`${process.env.NEXT_PUBLIC_API_URL}auth/reset-password/validate`, {
                password,
                code,
                email,
                messageId
            });
            setLoading(false);
            if (response.data) {
                SecureLocalStorage().remove("messageId")
            }
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    const verifyAccount = async ({ email, code }: { email: string; code: string }) => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.post(`${process.env.NEXT_PUBLIC_API_URL}auth/verify-account`, {
                email,
                code,
            });
            setLoading(false);
            if (response.data.accessToken) {
                SecureLocalStorage().set("accessToken", response.data.accessToken)
                SecureLocalStorage().set("refreshToken", response.data.refreshToken)
                SecureLocalStorage().set("userId", response.data.userId)
                axiosInterceptor.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
                await getUser();
                setSuccess(true);
                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch (error: any) {
            console.log(error);
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    const googleLogin = async ({ code }: { code: string }) => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.post(`${process.env.NEXT_PUBLIC_API_URL}auth/google-login`, {
                code,
            });
            if (response.data.accessToken) {
                SecureLocalStorage().set("accessToken", response.data.accessToken)
                SecureLocalStorage().set("refreshToken", response.data.refreshToken)
                axiosInterceptor.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
                await getUser();
                setLoading(false);
                setSuccess(true);
            }
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError(error.message as string);
            }
            setLoading(false);
        }
    };

    const changePassword = async (password: string, confirmPassword: string, newPassword: string) => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.post(`${process.env.NEXT_PUBLIC_API_URL}auth/reset-password/change`, {
                password,
                confirmPassword,
                newPassword
            });
            setLoading(false);
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    const setUpTwoFactorAuthentication = async () => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.get(`${process.env.NEXT_PUBLIC_API_URL}auth/2FA/setup`);
            console.log(response);
            if (response.data) {
                setQRImage(response.data.url)
            }
            setLoading(false);
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    const verifyTwoFactorAuthentication = async (authCode: string | undefined) => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.post(`${process.env.NEXT_PUBLIC_API_URL}auth/2FA/verify`, {
                code: authCode
            });
            console.log(response);
            setLoading(false);
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    const validateTwoFactorAuthentication = async (authCode: string | undefined) => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.post(`${process.env.NEXT_PUBLIC_API_URL}auth/2FA/validate`, {
                code: authCode,
                email,
                password,
                deviceInfo: await getDeviceInfo(),
            });
            if (response.data.accessToken) {
                console.log(response.data);
                SecureLocalStorage().set("accessToken", response.data.accessToken)
                SecureLocalStorage().set("refreshToken", response.data.refreshToken)
                SecureLocalStorage().set("userId", response.data.userDetails.userId)
                setSuccess(true);
                setIsAuthenticated(true);
            }
            setLoading(false);
        } catch (error: any) {
            console.log(error);
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    const getUser = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.get(`${process.env.NEXT_PUBLIC_API_URL}auth/me`);
            if (response.data) {
                SecureLocalStorage().set("userId", response.data.result._id)
                setUser(response.data.result);
            }
            setIsAuthenticated(true);
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    }, []);

    const saveWalletDetails = useCallback(async (walletAddress: string, chainId: number) => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.post(`${process.env.NEXT_PUBLIC_API_URL}auth/save-wallet-details`, {
                walletAddress,
                chainId
            });
            if (response.data) {
                setUser((prevState: any) => ({
                    ...prevState,
                    walletAddress: walletAddress,
                    chainId: chainId
                }));
                setIsAuthenticated(true);
            }
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    }, []);

    const value = {
        success,
        setEmail,
        setPassword,
        email,
        password,
        fullName,
        setFullName,
        loading,
        setLoading,
        error,
        signup,
        googleLogin,
        requestMessage,
        verifyAccount,
        walletLogin,
        login,
        logout,
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        sendResetPasswordEmail,
        resetPassword,
        changePassword,
        setUpTwoFactorAuthentication,
        qrImage,
        verifyTwoFactorAuthentication,
        twoFactorAuthentication,
        validateTwoFactorAuthentication,
        saveWalletDetails
    };

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}