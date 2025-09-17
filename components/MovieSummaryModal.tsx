
import React, { useState, useEffect } from 'react';
import { getMovieSummary } from '../services/geminiService';

interface MovieSummaryModalProps {
    movieTitle: string;
    onClose: () => void;
}

const MovieSummaryModal: React.FC<MovieSummaryModalProps> = ({ movieTitle, onClose }) => {
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            setIsLoading(true);
            const result = await getMovieSummary(movieTitle);
            setSummary(result);
            setIsLoading(false);
        };

        fetchSummary();
    }, [movieTitle]);

    return (
        <div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-brand-surface rounded-lg p-6 max-w-lg w-full relative transform transition-all animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <h2 className="text-2xl font-bold mb-4 text-brand-primary">{movieTitle} - AI Summary</h2>
                {isLoading ? (
                     <div className="flex items-center justify-center h-24">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
                     </div>
                ) : (
                    <p className="text-brand-text-secondary leading-relaxed">{summary}</p>
                )}
            </div>
             <style>{`
                @keyframes fade-in-up {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default MovieSummaryModal;
