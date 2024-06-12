'use client';
import React from 'react';
import { useAuth } from '../../../../context/Auth';
import { useSearchParams } from 'next/navigation'
import { useRedirectPage } from "@/routes/RedirectRoute";
import styled from 'styled-components';

const VerifyAccountContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const VerifyAccountWrapper = styled.div`
    width: 100%;
    max-width: 500px;
    height: 100%;
    padding: 28px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const VerifyAccountTitle = styled.h1`
    font-size: 24px;
    font-weight: 600;
    line-height: 28px;
    margin-bottom: 12px;
`;

const VerifyAccountSubTitle = styled.span`
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    margin-bottom: 28px;
`;

const Loader = styled.div`
    border-width: 0.5rem;
    border-style: solid;
    border-color: purple purple purple purple;
    width: 3.625rem;
    height: 3.625rem;
    border-radius: 50%;
    position: relative;
    -webkit-animation: spin 2s infinite;
    animation: spin 2s infinite;

    &:before,
    &:after {
        content: "";
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: purple;
        position: absolute;
        left: 0.125rem;
    }

    &:before {
        top: 0.063rem;
    }

    &:after {
        bottom: 0.063rem;
    }

    @keyframes spin {
        100% {
        transform: rotate(360deg);
        }
    }
`;

const VerifyAccount = () => {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const email = searchParams.get('email');
    const { verifyAccount } = useAuth();
    const { redirectPage } = useRedirectPage({
        href: '/home',
        isPrefetch: true
    });

    React.useEffect(() => {
        (async () => {
            if (code && email) {
                const res = await verifyAccount({ code: code as string, email: email as string });
                if (res) {
                    redirectPage();
                }
            }
        })();
    }, [code, email, redirectPage, verifyAccount]);

    return (
        <VerifyAccountContainer>
            <VerifyAccountWrapper>
                <VerifyAccountTitle>Verify Account</VerifyAccountTitle>
                <VerifyAccountSubTitle>Please wait while we verify your account.</VerifyAccountSubTitle>
                <Loader />
            </VerifyAccountWrapper>
        </VerifyAccountContainer>
    );
};

export default VerifyAccount;