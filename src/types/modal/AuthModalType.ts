export interface BaseModalType {
  isOpen: boolean;
  closeModal: (e?: any) => void;
  openModal: (e?: any) => void;
}

export interface SignUpContextType extends BaseModalType {
  email: string;
  password: string;
  signUp: (e?: any) => void;
  signUpWithGoogle: (e?: any) => void;
  signUpWithFacebook?: (e?: any) => void;
  signUpWithMetamask: (e?: any) => void;
  signUpWithCoinbase: (e?: any) => void;
  signUpWithWallet: (e?: any) => void;
  loading?: boolean;
  setLoading?: (e?: any) => void;
  disconnectAsync?: () => void;
  isConnected?: boolean;
}

export interface SignInContextType extends BaseModalType {
  email: string;
  password: string;
  isStaySignedIn?: boolean;
  signIn: (e?: any) => void;
  signInWithGoogle: (e?: any) => void;
  signInWithFacebook?: (e?: any) => void;
  signInWithMetamask: (e?: any) => void;
  signInWithCoinbase: (e?: any) => void;
  signInWithWallet: (e?: any) => void;
  loading?: boolean;
  setLoading?: (e?: any) => void;
  disconnectAsync?: () => void;
  isConnected?: boolean;
}