'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { useAccount, useConnect, useDisconnect, useNetwork, useSignMessage, useWalletClient } from 'wagmi';
import { useAuth } from '../Auth';
import { NETWORK } from '../../utils/crypts/network/cryptsNetwork';
import { useModal } from '../../hooks/useModal';

interface WalletServicesContextType {
  isOpenByConnectedConfirmModal: boolean;
  isOpenBySelectedWallets: boolean;
  userNetwork: string | null;
  userWalletAddress: string | null;
  loading: boolean;
  isConnected: boolean;
  onClickConnectedConfirm: () => void;
  closeByConnectedConfirmModal: () => void;
  openByConnectedConfirmModal: () => void;
  closeBySelectedWallets: () => void;
  openBySelectedWallets: () => void;
  connectMetamask: (callback?: () => void) => void;
  SignUpWithCoinBase: (callback?: () => void) => void;
  SignUpWithWallet: (callback?: () => void) => void;
  initConnect: () => void;
}

const defaultWalletServicesContext = {
  isOpenByConnectedConfirmModal: false,
  isOpenBySelectedWallets: false,
  userNetwork: null,
  userWalletAddress: null,
  loading: false,
  isConnected: false,
  onClickConnectedConfirm: () => { },
  closeByConnectedConfirmModal: () => { },
  openByConnectedConfirmModal: () => { },
  closeBySelectedWallets: () => { },
  openBySelectedWallets: () => { },
  connectMetamask: () => { },
  SignUpWithCoinBase: () => { },
  SignUpWithWallet: () => { },
  initConnect: () => { },
};

const WalletServicesContext = React.createContext<WalletServicesContextType>(defaultWalletServicesContext);

export const useWalletServices = () => {
  return React.useContext(WalletServicesContext);
}

interface WalletServicesProps {
  children: React.ReactNode;
}

export const WalletConnectProvider = ({ children }: WalletServicesProps) => {
  const [userNetwork, setUserNetwork] = useState<string | null>(null);
  const [userWalletAddress, setUserWalletAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { isConnected, address, connector } = useAccount();
  const { connectAsync, connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();
  const { disconnectAsync } = useDisconnect();
  const { requestMessage, saveWalletDetails, user, walletLogin } = useAuth();
  const { modalIsOpen: isOpenBySelectedWallets, closeModal: closeBySelectedWallets, openModal: openBySelectedWallets } = useModal();
  const { modalIsOpen: isOpenByConnectedConfirmModal, closeModal: closeByConnectedConfirmModal, openModal: openByConnectedConfirmModal } = useModal();

  const onClickConnectedConfirm = () => {
    closeByConnectedConfirmModal();
    openBySelectedWallets();
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
        const walletAddress = data.account;
        const chainId: number = data.chain.id;
        const network = NETWORK[chainId ?? 1] as string;
        setUserNetwork(network);
        setUserWalletAddress(walletAddress);
        return signature;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const connectMetamask = async (callback?: () => void) => {
    try {
      const metamaskConnector = connectors.find(connector => connector.name === 'MetaMask');
      if (!metamaskConnector) {
        throw new Error(`Could not find MetaMask connector`)
      };
      const signature = await handleWalletConnection({ connector: metamaskConnector });
      if (signature) {
        callback && callback();
      } else {
        alert("Connection has been lost. Please reload or check your metamask connection.");
        throw new Error(`Could not connect to MetaMask`)
      }
    } catch (error) {
      console.log(error);
    } finally {
      closeBySelectedWallets();
    }
  };

  const SignUpWithCoinBase = (callback?: () => void) => {
    try {
      const coinbaseConnector = connectors.find(connector => connector.name === 'Coinbase Wallet');
      if (coinbaseConnector) {
        handleWalletConnection({ connector: coinbaseConnector });
      }
      if (!isConnected) {
        closeBySelectedWallets();
        return;
      };
      callback && callback();
    } catch (error) {
      console.log(error);
    }
  }

  const SignUpWithWallet = (callback?: () => void) => {
    try {
      const coinbaseConnector = connectors.find(connector => connector.name === 'WalletConnect');
      if (coinbaseConnector) {
        handleWalletConnection({ connector: coinbaseConnector });
      }
      if (!isConnected) {
        closeBySelectedWallets();
        return;
      };
      callback && callback();
    } catch (error) {
      console.log(error);
    }
  }

  const initConnect = async () => {
    if (isConnected && chain && address) {
      const walletAddress: string = address;
      const chainId: number = chain.id;
      const network = NETWORK[chainId ?? 1] as string;
      setUserNetwork(network);
      setUserWalletAddress(walletAddress);
    }
  }

  return (
    <WalletServicesContext.Provider
      value={{
        isOpenByConnectedConfirmModal,
        isOpenBySelectedWallets,
        userNetwork,
        userWalletAddress,
        loading,
        isConnected,
        onClickConnectedConfirm,
        closeByConnectedConfirmModal,
        openByConnectedConfirmModal,
        closeBySelectedWallets,
        openBySelectedWallets,
        connectMetamask,
        SignUpWithCoinBase,
        SignUpWithWallet,
        initConnect,
      }}
    >
      {children}
    </WalletServicesContext.Provider>
  )
}