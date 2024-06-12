'use client';

import dynamic from "next/dynamic";

const LandingPage = dynamic(() => import('../components/pages/lp/LandingPage'), { ssr: false });
export default function Home() {

    return (
        <div>
            <LandingPage />
        </div>
    );
}
