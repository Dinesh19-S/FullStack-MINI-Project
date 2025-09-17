
import React, { useState, useMemo } from 'react';
import { Movie, Showtime } from '../types';
import { CITIES } from '../constants';

interface ShowtimePageProps {
    movie: Movie;
    city: string;
    onShowtimeSelect: (theater: string, date: string, showtime: Showtime) => void;
    onBack: () => void;
}

const Dropdown: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: { value: string; label: string }[]; placeholder: string; disabled?: boolean; }> = 
({ label, value, onChange, options, placeholder, disabled = false }) => (
    <div>
        <label className="block text-sm font-medium text-brand-text-secondary mb-1">{label}</label>
        <select
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full bg-brand-secondary border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:opacity-50"
        >
            <option value="">{placeholder}</option>
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
    </div>
);


const ShowtimePage: React.FC<ShowtimePageProps> = ({ movie, city: selectedCityName, onShowtimeSelect, onBack }) => {
    const [selectedTheaterName, setSelectedTheaterName] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const dates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return d;
    });

    const theaterOptions = useMemo(() => {
        if (!selectedCityName) return [];
        const cityData = CITIES.find(c => c.name === selectedCityName);
        return cityData ? cityData.theaters.map(t => ({ value: t.name, label: t.name })) : [];
    }, [selectedCityName]);
    
    const showtimes = useMemo(() => {
        if (!selectedCityName || !selectedTheaterName) return [];
        const cityData = CITIES.find(c => c.name === selectedCityName);
        const theater = cityData?.theaters.find(t => t.name === selectedTheaterName);
        return theater ? theater.showtimes : [];
    }, [selectedCityName, selectedTheaterName]);

    const handleTimeSelect = (showtime: Showtime) => {
        onShowtimeSelect(selectedTheaterName, selectedDate, showtime);
    };

    return (
        <section>
            <button onClick={onBack} className="mb-6 text-brand-primary hover:underline font-semibold">
                &larr; Back to City Selection
            </button>
            <div className="flex flex-col md:flex-row gap-8 mb-8">
                <img src={movie.posterUrl} alt={movie.title} className="w-full md:w-64 h-auto rounded-lg object-cover self-start shadow-lg" />
                <div>
                    <h2 className="text-4xl font-bold text-brand-primary">{movie.title}</h2>
                    <p className="text-lg text-brand-text-secondary mt-2">{movie.genre}</p>
                    <p className="text-brand-text-secondary mt-1">{movie.duration} min | Rated {movie.rating}</p>
                </div>
            </div>

            <h3 className="text-3xl font-bold mb-6 text-brand-primary">Select Theater & Time in {selectedCityName}</h3>
            <div className="bg-brand-surface p-6 rounded-lg space-y-8">
                 <div className="md:col-span-2">
                    <Dropdown 
                     label="Theater"
                     placeholder="Select a Theater"
                     value={selectedTheaterName}
                     onChange={(e) => setSelectedTheaterName(e.target.value)}
                     options={theaterOptions}
                   />
                </div>
                
                <div className={!selectedTheaterName ? 'opacity-50 pointer-events-none' : ''}>
                    <h4 className="text-xl font-semibold mb-4">Date</h4>
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

                    <h4 className="text-xl font-semibold mt-6 mb-4">Time</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {showtimes.length > 0 ? showtimes.map(showtime => (
                             <button
                                key={showtime.time}
                                onClick={() => handleTimeSelect(showtime)}
                                className="p-3 rounded-lg text-center transition-colors duration-200 bg-brand-secondary hover:bg-gray-700"
                             >
                                <span className="font-semibold">{showtime.time}</span>
                             </button>
                        )) : <p className="text-brand-text-secondary col-span-full">Please select a theater to see available times.</p>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShowtimePage;
