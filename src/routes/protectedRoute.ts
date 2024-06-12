import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../../context/Auth';

export const useProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log('isAuthenticated', isAuthenticated);
        if (!isAuthenticated) {
            router.push('/auth');
        }
    }, [isAuthenticated, router]);

    return isAuthenticated;
};
