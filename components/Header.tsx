
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';

interface HeaderProps {
    currentUser: User | null;
    onSignOut: () => void;
    onSignInClick: () => void;
    onHistoryClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onSignOut, onSignInClick, onHistoryClick }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-brand-secondary shadow-lg">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary tracking-wider">
                    CineReserve
                </h1>
                
                <div className="flex items-center space-x-4">
                    {currentUser ? (
                        <>
                            {onHistoryClick && (
                                <button 
                                    onClick={onHistoryClick}
                                    className="bg-brand-primary/10 text-brand-primary font-semibold py-2 px-4 rounded-lg hover:bg-brand-primary/20 transition-colors duration-200 text-sm hidden sm:block"
                                >
                                    Booking History
                                </button>
                            )}
                            <div className="relative" ref={profileRef}>
                                <button onClick={() => setIsProfileOpen(prev => !prev)} className="flex items-center space-x-2 p-2 rounded-full hover:bg-brand-surface">
                                    <span className="font-semibold text-white">{currentUser.name}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-brand-surface rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                                        <div className="px-4 py-2 border-b border-gray-700">
                                            <p className="text-sm font-medium text-white truncate">{currentUser.name}</p>
                                            <p className="text-sm text-gray-400 truncate">{currentUser.email}</p>
                                        </div>
                                        <button 
                                            onClick={onHistoryClick}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-brand-secondary sm:hidden"
                                        >
                                            Booking History
                                        </button>
                                        <button 
                                            onClick={() => {
                                                onSignOut();
                                                setIsProfileOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-brand-secondary"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                         <button
                            onClick={onSignInClick}
                            className="bg-brand-primary text-black font-semibold py-2 px-5 rounded-lg hover:bg-yellow-400 transition-colors duration-200"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
