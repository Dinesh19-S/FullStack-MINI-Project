
import React from 'react';
import { Booking } from '../types';

interface ConfirmationPageProps {
    booking: Booking;
    onReset: () => void;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ booking, onReset }) => {
    return (
        <div className="bg-brand-surface p-8 rounded-lg max-w-2xl mx-auto text-center">
            <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h2 className="text-3xl font-bold text-brand-primary mb-2">Booking Confirmed!</h2>
            <p className="text-brand-text-secondary mb-6">Your tickets have been booked. A confirmation has been sent to your email.</p>

            <div className="bg-brand-secondary p-6 rounded-lg text-left space-y-4">
                <h3 className="text-xl font-bold border-b border-gray-600 pb-2 mb-4">{booking.movie.title}</h3>
                <div><strong>Location:</strong> {booking.theater}, {booking.city}</div>
                <div><strong>Date:</strong> {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                <div><strong>Time:</strong> {booking.showtime.time}</div>
                <div><strong>Seats:</strong> 
                    <div className="flex flex-wrap gap-2 mt-1">
                        {booking.seats.sort().map(seat => (
                            <span key={seat} className="bg-brand-surface text-brand-text-secondary px-3 py-1 rounded-full text-sm font-mono">{seat}</span>
                        ))}
                    </div>
                </div>
                <div className="pt-4 border-t border-gray-600 font-bold text-xl">
                    Total Paid: ₹{booking.totalPrice.toFixed(2)}
                </div>
            </div>

            <button
                onClick={onReset}
                className="mt-8 w-full max-w-sm mx-auto text-center py-3 px-4 rounded-lg bg-brand-primary text-black font-bold hover:bg-yellow-400 transition-colors duration-200"
            >
                Book Another Movie
            </button>
        </div>
    );
};

export default ConfirmationPage;
