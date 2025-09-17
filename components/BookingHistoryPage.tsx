
import React, { useState, useEffect } from 'react';
import { Booking } from '../types';

interface BookingHistoryPageProps {
    onBack: () => void;
}

const BookingHistoryCard: React.FC<{ booking: Booking }> = ({ booking }) => (
    <div className="bg-brand-surface rounded-lg p-4 flex flex-col sm:flex-row gap-4">
        <img src={booking.movie.posterUrl} alt={booking.movie.title} className="w-24 h-36 rounded-md object-cover self-center sm:self-start" />
        <div className="flex-grow">
            <h3 className="text-xl font-bold text-brand-primary">{booking.movie.title}</h3>
            <p className="text-sm text-brand-text-secondary mt-1">{booking.theater}, {booking.city}</p>
            <p className="text-sm text-brand-text-secondary">{new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {booking.showtime.time}</p>
            
            <div className="mt-3">
                <span className="font-semibold text-sm">Seats: </span>
                <span className="text-brand-text-secondary text-sm font-mono">{booking.seats.join(', ')}</span>
            </div>
            <div className="mt-1">
                <span className="font-semibold text-sm">Total: </span>
                <span className="text-brand-text-secondary text-sm">₹{booking.totalPrice.toFixed(2)}</span>
            </div>
             {booking.bookingDate && (
                <p className="text-xs text-gray-500 mt-2">
                    Booked on: {new Date(booking.bookingDate).toLocaleString()}
                </p>
            )}
        </div>
    </div>
);


const BookingHistoryPage: React.FC<BookingHistoryPageProps> = ({ onBack }) => {
    const [history, setHistory] = useState<Booking[]>([]);

    useEffect(() => {
        try {
            const historyJSON = localStorage.getItem('bookingHistory');
            setHistory(historyJSON ? JSON.parse(historyJSON) : []);
        } catch (error) {
            console.error("Could not retrieve booking history:", error);
            setHistory([]);
        }
    }, []);

    return (
        <section>
             <button onClick={onBack} className="mb-6 text-brand-primary hover:underline font-semibold">
                &larr; Back to Movies
            </button>

            <h2 className="text-3xl font-bold mb-6 text-brand-primary">Booking History</h2>

            {history.length > 0 ? (
                <div className="space-y-6">
                    {history.map((booking) => (
                        <BookingHistoryCard key={booking.bookingId || booking.bookingDate} booking={booking} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-brand-surface rounded-lg">
                    <p className="text-brand-text-secondary text-lg">You have no past bookings.</p>
                    <button
                        onClick={onBack}
                        className="mt-6 text-center py-3 px-6 rounded-lg bg-brand-primary text-black font-bold hover:bg-yellow-400 transition-colors duration-200"
                    >
                        Book a Movie Now
                    </button>
                </div>
            )}
        </section>
    );
};

export default BookingHistoryPage;