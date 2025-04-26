import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../action/loginAction';
import { LoginRequest } from '../../../axios/types';

interface UseLoginReturn {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    isLoading: boolean;
    error: string | null;
    handleLogin: (e: React.FormEvent) => Promise<void>;
}

export const useLogin = (): UseLoginReturn => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const credentials: LoginRequest = { email, password };
            const response = await loginUser(credentials);

            if (response.success) {
                navigate('/builder');
            } else {
                setError(response.errors?.[0] || 'Login failed. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        isLoading,
        error,
        handleLogin,
    };
}; 