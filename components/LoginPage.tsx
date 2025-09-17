
import React, { useState } from 'react';
import { User } from '../types';

interface LoginPageProps {
    onLoginSuccess: (user: User) => void;
}

interface SocialButtonProps {
    icon: JSX.Element;
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, label, onClick, disabled }) => (
    <button 
        onClick={onClick}
        disabled={disabled}
        className="flex items-center justify-center w-full py-3 px-4 bg-brand-secondary hover:bg-gray-700 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
        {icon}
        <span className="ml-3 font-semibold">{label}</span>
    </button>
);

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLoginAttempt = () => {
        setIsLoggingIn(true);
        setTimeout(() => {
            setIsLoggingIn(false);
            onLoginSuccess({ name: 'Guest User', email: 'guest@cinereserve.com' });
        }, 1500); // Simulate login delay
    };
    
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLoginAttempt();
    };

    return (
        <div className="flex items-center justify-center py-12">
            <div className="bg-brand-surface p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-brand-primary mb-2">Welcome Back</h2>
                <p className="text-center text-brand-text-secondary mb-8">Sign in to continue to CineReserve</p>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-brand-text-secondary mb-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            defaultValue="guest@cinreserve.com"
                            className="w-full bg-brand-secondary border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brand-text-secondary mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                             defaultValue="password"
                            className="w-full bg-brand-secondary border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full text-center py-3 px-4 rounded-lg bg-brand-primary text-black font-bold text-lg hover:bg-yellow-400 transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoggingIn ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing In...
                            </>
                        ) : 'Sign In'}
                    </button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-gray-700"></div>
                    <span className="flex-shrink mx-4 text-brand-text-secondary text-sm">Or continue with</span>
                    <div className="flex-grow border-t border-gray-700"></div>
                </div>

                <div className="space-y-4">
                    <SocialButton
                        onClick={handleLoginAttempt}
                        disabled={isLoggingIn}
                        label="Continue with Google" 
                        icon={<svg className="w-6 h-6" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.012,36.49,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>} 
                    />
                    <SocialButton
                        onClick={handleLoginAttempt}
                        disabled={isLoggingIn}
                        label="Continue with X"
                        icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}
                    />
                     <SocialButton
                        onClick={handleLoginAttempt}
                        disabled={isLoggingIn}
                        label="Continue with Facebook"
                        icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
