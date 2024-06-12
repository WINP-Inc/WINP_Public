import { SignInContextType, SignUpContextType } from '@/types/modal/AuthModalType';
import { useGoogleLogin } from '@react-oauth/google';
import React, { FC, createContext, useCallback, useContext, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { UseModalType, defaultModalValues, useModal } from '../../hooks/useModal';
import { useAuth } from '../Auth';
import { useRouter } from 'next/navigation';

const defaultSignUpModalContext: SignUpContextType = {
  isOpen: false,
  openModal: () => { },
  closeModal: () => { },
  email: '',
  password: '',
  signUp: () => { },
  signUpWithGoogle: () => { },
  signUpWithFacebook: () => { },
  signUpWithMetamask: () => { },
  signUpWithCoinbase: () => { },
  signUpWithWallet: () => { },
  loading: false,
  setLoading: () => { },
  disconnectAsync: () => { },
  isConnected: false,
}

const defaultSignInModalContext: SignInContextType = {
  isOpen: false,
  openModal: () => { },
  closeModal: () => { },
  email: '',
  password: '',
  signIn: () => { },
  signInWithGoogle: () => { },
  signInWithFacebook: () => { },
  signInWithMetamask: () => { },
  signInWithCoinbase: () => { },
  signInWithWallet: () => { },
  loading: false,
  setLoading: () => { },
  disconnectAsync: () => { },
  isConnected: false,
}

const SignUpContext = createContext<SignUpContextType>(defaultSignUpModalContext);
const SignInContext = createContext<SignInContextType>(defaultSignInModalContext);
const VerifyContext = createContext<UseModalType>(defaultModalValues);
const ForgotPasswordContext = createContext<UseModalType>(defaultModalValues);
const ResetPasswordContext = createContext<UseModalType>(defaultModalValues);
const ResetPasswordSuccessfulContext = createContext<UseModalType>(defaultModalValues);
const VerifyOtpContext = createContext<UseModalType>(defaultModalValues);
const CreateUserContext = createContext<UseModalType>(defaultModalValues);

export const useSignUpModal = () => useContext(SignUpContext);
export const useSignInModal = () => useContext(SignInContext);
export const useVerifyAccountModal = () => useContext(VerifyContext);
export const useForgotPasswordModal = () => useContext(ForgotPasswordContext);
export const useResetPasswordModal = () => useContext(ResetPasswordContext);
export const useResetPasswordSuccessfulModal = () => useContext(ResetPasswordSuccessfulContext);
export const useVerifyOtpModal = () => useContext(VerifyOtpContext);
export const useCreateUserModal = () => useContext(CreateUserContext);

interface AuthModalProviderType {
  children: React.ReactNode;
}

export const SignUpProvider: FC<AuthModalProviderType> = ({ children }) => {
  const { modalIsOpen, closeModal, openModal } = useModal();
  const { email, password, signup, googleLogin, loading, setLoading, requestMessage, walletLogin, isAuthenticated } = useAuth();
  const googleSignUp = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async(res) => {
      try {
        setLoading(true);
        const { code } = res;
        await googleLogin({
          code: code
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });
  const { connectAsync, connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnectAsync } = useDisconnect();

  const signUpForm = (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      signup();
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  const signUpWithGoogle = () => {
    try {
      googleSignUp();
    } catch (error) {
      console.log(error);
    }
  }

  const SignUpWithMetamask = () => {
    try {
      const metamaskConnector = connectors.find(connector => connector.name === 'MetaMask');
      if (metamaskConnector) {
        handleWalletConnection({ connector: metamaskConnector });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const SignUpWithCoinBase = () => {
    try {
      const coinbaseConnector = connectors.find(connector => connector.name === 'Coinbase Wallet');
      if (coinbaseConnector) {
        handleWalletConnection({ connector: coinbaseConnector });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const SignUpWithWallet = () => {
    try {
      const coinbaseConnector = connectors.find(connector => connector.name === 'WalletConnect');
      if (coinbaseConnector) {
        handleWalletConnection({ connector: coinbaseConnector });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleWalletConnection = useCallback(async ({ connector }: any) => {
    try {
      setLoading(true);
      if (isConnected) {
        await disconnectAsync();
        return;
      }
      const data = await connectAsync({ connector });
      try {
        const response = await requestMessage({
          address: data.account,
          chain: String(data.chain.id)
        });
        const message = response.message.message;
        const signature = await signMessageAsync({ message });
        if (signature) {
          await walletLogin({
            message,
            signature,
            chainId: data.chain.id
          });
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <SignUpContext.Provider
      value={{
        isOpen: modalIsOpen,
        closeModal: closeModal,
        openModal: openModal,
        email: email,
        password: password,
        signUp: signUpForm,
        signUpWithGoogle: signUpWithGoogle,
        signUpWithMetamask: SignUpWithMetamask,
        signUpWithCoinbase: SignUpWithCoinBase,
        signUpWithWallet: SignUpWithWallet,
        loading: loading,
        setLoading: setLoading,
        disconnectAsync: disconnectAsync,
        isConnected: isConnected,
      }}
    >
      {children}
    </SignUpContext.Provider>
  )
};

export const SignInProvider: FC<AuthModalProviderType> = ({ children }) => {
  const { modalIsOpen, closeModal, openModal } = useModal();
  const { email, password, login, googleLogin, loading, setLoading, requestMessage, walletLogin } = useAuth();
  const googleSignIn = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (res) => {
      try {
        setLoading(true);
        const { code } = res;
        await googleLogin({
          code: code
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });
  const { connectAsync, connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnectAsync } = useDisconnect();

  const SignInForm = (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      login();
    } catch (error) {
      console.log(error);
    }
  }

  const signInWithGoogle = () => {
    try {
      setLoading(true);
      googleSignIn();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  const SignInWithMetamask = () => {
    try {
      const metamaskConnector = connectors.find(connector => connector.name === 'MetaMask');
      if (metamaskConnector) {
        handleWalletConnection({ connector: metamaskConnector });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const SignInWithCoinBase = () => {
    try {
      const coinbaseConnector = connectors.find(connector => connector.name === 'Coinbase Wallet');
      if (coinbaseConnector) {
        handleWalletConnection({ connector: coinbaseConnector });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const SignInWithWallet = () => {
    try {
      const coinbaseConnector = connectors.find(connector => connector.name === 'WalletConnect');
      if (coinbaseConnector) {
        handleWalletConnection({ connector: coinbaseConnector });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleWalletConnection = useCallback(async ({ connector }: any) => {
    try {
      setLoading(true);
      if (isConnected) {
        await disconnectAsync();
        return;
      }
      const data = await connectAsync({ connector });
      try {
        const response = await requestMessage({
          address: data.account,
          chain: String(data.chain.id)
        });
        const message = response.message.message;
        const signature = await signMessageAsync({ message });
        if (signature) {
          await walletLogin({
            message,
            signature,
            chainId: data.chain.id
          });
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <SignInContext.Provider
      value={{
        isOpen: modalIsOpen,
        closeModal: closeModal,
        openModal: openModal,
        email: email,
        password: password,
        signIn: SignInForm,
        signInWithGoogle: signInWithGoogle,
        signInWithMetamask: SignInWithMetamask,
        signInWithCoinbase: SignInWithCoinBase,
        signInWithWallet: SignInWithWallet,
        loading: loading,
        setLoading: setLoading,
        disconnectAsync: disconnectAsync,
        isConnected: isConnected,
      }}
    >
      {children}
    </SignInContext.Provider>
  );
}

const AuthModalProvider: FC<AuthModalProviderType & { context: React.Context<UseModalType> }> = ({ children, context }) => {
  const modalControls = useModal();
  return <context.Provider value={modalControls}>{children}</context.Provider>;
};

export const ResetPasswordProvider: FC<AuthModalProviderType> = ({ children }) => (
  <AuthModalProvider context={ResetPasswordContext}>{children}</AuthModalProvider>
);

export const ResetPasswordSuccessfulProvider: FC<AuthModalProviderType> = ({ children }) => (
  <AuthModalProvider context={ResetPasswordSuccessfulContext}>{children}</AuthModalProvider>
);

export const VerifyOtpProvider: FC<AuthModalProviderType> = ({ children }) => (
  <AuthModalProvider context={VerifyOtpContext}>{children}</AuthModalProvider>
);

export const VerifyProvider: FC<AuthModalProviderType> = ({ children }) => (
  <AuthModalProvider context={VerifyContext}>{children}</AuthModalProvider>
);

export const ForgotPasswordProvider: FC<AuthModalProviderType> = ({ children }) => (
  <AuthModalProvider context={ForgotPasswordContext}>{children}</AuthModalProvider>
);

export const CreateUserProvider: FC<AuthModalProviderType> = ({ children }) => (
  <AuthModalProvider context={CreateUserContext}>{children}</AuthModalProvider>
);
