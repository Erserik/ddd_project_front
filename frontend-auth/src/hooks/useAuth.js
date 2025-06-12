import { useEffect, useState } from 'react';

export default function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access'));

    useEffect(() => {
        const onStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem('access'));
        };

        window.addEventListener('storage', onStorageChange);
        return () => window.removeEventListener('storage', onStorageChange);
    }, []);

    return isAuthenticated;
}
