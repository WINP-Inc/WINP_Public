import Image from 'next/image';
import React, { FC } from 'react'
import { styled } from 'styled-components'
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useGoogleLogin } from '@react-oauth/google';

export interface AuthServiceName {
  iconSrc: string;
  name: string;
  action: () => void;
}

interface ContinueWithServiceButtonProps {
  serviceName: AuthServiceName
}

const BaseServiceButton = styled.button`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 16px;
  height: 52px;
  width: 100%;
  box-shadow: 0px 2.75474px 3.38082px 0px rgba(0, 0, 0, 0.05), 0px 22px 27px 0px rgba(0, 0, 0, 0.03);
  border-radius: 100px;
  background: #302A43;
  cursor: pointer;

  &:hover {
    opacity: .8;
  }

  span {
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    display: block;
    color: #FFF;
  }

  img {
    position: static !important;
    width: 18px !important;
    height: 18px !important;
  }
`

const ContinueWithServiceButton: FC<ContinueWithServiceButtonProps> = ({ serviceName }) => {
  return (
    <BaseServiceButton onClick={serviceName.action}>
      <Image layout="fill" src={serviceName.iconSrc} alt='service-icon' />
      <span>{`Continue with ${serviceName.name}`}</span>
    </BaseServiceButton>
  )
}

export default ContinueWithServiceButton
