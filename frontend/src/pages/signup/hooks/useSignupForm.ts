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

        // Clear password mismatch error when user types in either password field
        if (name === 'password' || name === 'confirmPassword') {
            setError(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Validate passwords match
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match. Please make sure both passwords are identical.');
                setIsLoading(false);
                return;
            }

            // Validate password strength
            if (formData.password.length < 8) {
                setError('Password must be at least 8 characters long.');
                setIsLoading(false);
                return;
            }

            const response = await signupUser(formData);

            if (response.success) {
                // Redirect to login page on successful signup
                navigate('/login', {
                    state: {
                        message: 'Account created successfully! Please log in with your credentials.'
                    }
                });
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