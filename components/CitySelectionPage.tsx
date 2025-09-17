
import React from 'react';
import { Movie } from '../types';
import { CITIES } from '../constants';

interface CitySelectionPageProps {
    movie: Movie;
    onCitySelect: (cityName: string) => void;
    onBack: () => void;
}

const CitySelectionPage: React.FC<CitySelectionPageProps> = ({ movie, onCitySelect, onBack }) => {
    return (
        <section>
            <button onClick={onBack} className="mb-6 text-brand-primary hover:underline font-semibold">
                &larr; Back to Movies
            </button>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-brand-primary">Select a City</h2>
                <p className="text-brand-text-secondary mt-1">to watch <span className="font-semibold text-white">{movie.title}</span></p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {CITIES.map(city => (
                    <button
                        key={city.name}
                        onClick={() => onCitySelect(city.name)}
                        className="bg-brand-surface p-6 rounded-lg text-xl font-semibold text-center text-white hover:bg-brand-secondary hover:ring-2 hover:ring-brand-primary transition-all duration-200"
                    >
                        {city.name}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default CitySelectionPage;
