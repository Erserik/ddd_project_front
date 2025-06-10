import { useEffect, useState } from 'react';

export default function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access');
        setIsAuthenticated(!!token);
    }, []);

    return isAuthenticated;
}
