
import React from 'react';
import { Booking } from '../types';

interface BookingSummaryProps {
    booking: Booking;
    onBack: () => void;
    onProceed?: () => void;
    proceedButtonText?: string;
    isProceedDisabled?: boolean;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ booking, onBack, onProceed, proceedButtonText, isProceedDisabled = false }) => {
    const { movie, date, showtime, seats, totalPrice, city, theater } = booking;
    
    return (
        <div className="bg-brand-surface p-6 rounded-lg sticky top-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-primary border-b border-brand-secondary pb-2">Booking Summary</h2>
            <div className="flex space-x-4">
                <img src={movie.posterUrl} alt={movie.title} className="w-24 h-36 rounded-md object-cover" />
                <div>
                    <h3 className="text-xl font-bold">{movie.title}</h3>
                    <p className="text-sm text-brand-text-secondary">{movie.genre}</p>
                    <p className="text-sm text-brand-text-secondary mt-2 font-semibold">{city}</p>
                    <p className="text-sm text-brand-text-secondary">{theater}</p>
                    <p className="text-sm text-brand-text-secondary mt-1">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {showtime.time}</p>
                </div>
            </div>

            <div className="mt-6">
                <h4 className="font-semibold text-lg">Selected Seats</h4>
                {seats.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {seats.sort().map(seat => (
                            <span key={seat} className="bg-brand-secondary text-brand-text-secondary px-3 py-1 rounded-full text-sm font-mono">{seat}</span>
                        ))}
                    </div>
                ) : (
                    <p className="text-brand-text-secondary text-sm mt-2">Please select your seats from the map.</p>
                )}
            </div>

            <div className="mt-6 pt-4 border-t border-brand-secondary">
                <div className="flex justify-between items-center text-2xl font-bold">
                    <span>Total</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                </div>
            </div>

            <div className="mt-8 flex flex-col space-y-3">
                 <button 
                    onClick={onBack}
                    className="w-full text-center py-3 px-4 rounded-lg bg-brand-secondary hover:bg-gray-700 transition-colors duration-200 font-semibold"
                >
                    Go Back
                </button>
                {onProceed && proceedButtonText && (
                    <button 
                        onClick={onProceed}
                        disabled={isProceedDisabled}
                        className="w-full text-center py-3 px-4 rounded-lg bg-brand-primary text-black font-bold hover:bg-yellow-400 transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {proceedButtonText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default BookingSummary;
