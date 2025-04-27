import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../action/signupAction';
import { SignupRequest } from '../types/signupTypes';

interface UseSignupFormReturn {
    formData: SignupRequest;
    isLoading: boolean;
    error: string | null;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const useSignupForm = (): UseSignupFormReturn => {
    const [formData, setFormData] = useState<SignupRequest>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Validate passwords match
            if (formData.password !== formData.confirmPassword) {
                throw new Error('Passwords do not match');
            }

            const response = await signupUser(formData);

            if (response.success) {
                navigate('/builder');
            } else {
                setError(response.errors?.[0] || 'Signup failed. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        isLoading,
        error,
        handleChange,
        handleSubmit,
    };
}; 