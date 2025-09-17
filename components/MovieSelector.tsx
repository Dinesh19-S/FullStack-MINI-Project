import React, { useState } from 'react';
import { Movie } from '../types';
import MovieSummaryModal from './MovieSummaryModal';

interface MovieSelectorProps {
    movies: Movie[];
    onMovieSelect: (movie: Movie) => void;
}

const MovieCard: React.FC<{ movie: Movie; onSelect: () => void }> = ({ movie, onSelect }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    return (
        <>
            <div
                onClick={onSelect}
                className={`relative rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ring-brand-primary/50 hover:ring-4`}
            >
                <img src={movie.posterUrl} alt={movie.title} className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                    <h3 className="text-lg font-bold text-white">{movie.title}</h3>
                    <p className="text-sm text-gray-300">{movie.genre}</p>
                    <button 
                        onClick={handleOpenModal}
                        className="mt-2 text-xs bg-brand-primary/80 text-black font-semibold py-1 px-3 rounded-full hover:bg-brand-primary transition-colors duration-200"
                    >
                        AI Summary
                    </button>
                </div>
            </div>
            {isModalOpen && <MovieSummaryModal movieTitle={movie.title} onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

const MovieSelector: React.FC<MovieSelectorProps> = ({ movies, onMovieSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold text-brand-primary">Now Showing</h2>
                <div className="relative w-full sm:w-auto">
                     <input
                        type="text"
                        placeholder="Search by title or genre..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full sm:w-64 bg-brand-secondary border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        aria-label="Search movies"
                    />
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
           
            {filteredMovies.length > 0 ? (
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {filteredMovies.map(movie => (
                        <MovieCard 
                            key={movie.id} 
                            movie={movie} 
                            onSelect={() => onMovieSelect(movie)} 
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-brand-surface rounded-lg">
                    <p className="text-brand-text-secondary text-lg">No movies found for "{searchQuery}".</p>
                    <p className="text-brand-text-secondary text-sm mt-2">Try a different search term.</p>
                </div>
            )}
        </section>
    );
};

export default MovieSelector;