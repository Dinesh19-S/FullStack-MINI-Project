
import React, { useState } from 'react';
import { Showtime } from '../types';
import { SHOWTIMES } from '../constants';

interface ShowtimeSelectorProps {
    onShowtimeSelect: (date: string, showtime: Showtime) => void;
}

const ShowtimeSelector: React.FC<ShowtimeSelectorProps> = ({ onShowtimeSelect }) => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const dates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return d;
    });

    const handleTimeSelect = (showtime: Showtime) => {
        setSelectedTime(showtime.time);
        onShowtimeSelect(selectedDate, showtime);
    };

    return (
        <section>
            <h2 className="text-3xl font-bold mb-6 text-brand-primary">Select Date & Time</h2>
            <div className="bg-brand-surface p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Date</h3>
                <div className="flex space-x-2 overflow-x-auto pb-4">
                    {dates.map(date => {
                        const dateString = date.toISOString().split('T')[0];
                        const isSelected = selectedDate === dateString;
                        return (
                            <button
                                key={dateString}
                                onClick={() => setSelectedDate(dateString)}
                                className={`flex-shrink-0 px-4 py-2 rounded-lg transition-colors duration-200 ${isSelected ? 'bg-brand-primary text-black font-bold' : 'bg-brand-secondary hover:bg-gray-700'}`}
                            >
                                <div className="text-sm">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                <div className="text-lg font-bold">{date.getDate()}</div>
                            </button>
                        );
                    })}
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">Time</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {SHOWTIMES.map(showtime => (
                         <button
                            key={showtime.time}
                            onClick={() => handleTimeSelect(showtime)}
                            className={`p-3 rounded-lg text-center transition-colors duration-200 ${selectedTime === showtime.time ? 'bg-brand-primary text-black font-bold' : 'bg-brand-secondary hover:bg-gray-700'}`}
                         >
                            <span className="font-semibold">{showtime.time}</span>
                            {/* FIX: Removed showtime.theatre as it does not exist on the Showtime type */}
                         </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ShowtimeSelector;
