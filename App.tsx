
import React, { useState, useCallback } from 'react';
import { Movie, Showtime, Booking, User } from './types';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import Footer from './components/Footer';
import MovieSelector from './components/MovieSelector';
import CitySelectionPage from './components/CitySelectionPage';
import ShowtimePage from './components/ShowtimePage';
import SeatSelectionPage from './components/SeatSelectionPage';
import PaymentPage from './components/PaymentPage';
import ConfirmationPage from './components/ConfirmationPage';
import BookingHistoryPage from './components/BookingHistoryPage';
import { MOVIES, SEAT_PRICE_RUPEES } from './constants';

type AppStep = 'login' | 'movies' | 'cities' | 'showtimes' | 'seats' | 'payment' | 'confirmation' | 'history';

const App: React.FC = () => {
    const [step, setStep] = useState<AppStep>('login');
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [postLoginCallback, setPostLoginCallback] = useState<(() => void) | null>(null);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [selectedTheater, setSelectedTheater] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const handleLoginSuccess = useCallback((user: User) => {
        setCurrentUser(user);
        if (postLoginCallback) {
            postLoginCallback();
            setPostLoginCallback(null);
        } else {
            setStep('movies');
        }
    }, [postLoginCallback]);

    const resetBookingState = useCallback(() => {
        setSelectedMovie(null);
        setSelectedCity(null);
        setSelectedTheater(null);
        setSelectedDate('');
        setSelectedShowtime(null);
        setSelectedSeats([]);
    }, []);
    
    const handleSignOut = useCallback(() => {
        setCurrentUser(null);
        resetBookingState();
        setStep('login');
    }, [resetBookingState]);

    const handleSignInClick = useCallback(() => {
        resetBookingState();
        setPostLoginCallback(null);
        setStep('login');
    }, [resetBookingState]);

    const handleMovieSelect = useCallback((movie: Movie) => {
        const action = () => {
            setSelectedMovie(movie);
            setSelectedCity(null);
            setSelectedTheater(null);
            setSelectedDate('');
            setSelectedShowtime(null);
            setSelectedSeats([]);
            setStep('cities');
        };

        if (!currentUser) {
            setPostLoginCallback(() => action);
            setStep('login');
        } else {
            action();
        }
    }, [currentUser]);

    const handleCitySelect = useCallback((city: string) => {
        setSelectedCity(city);
        setSelectedTheater(null);
        setSelectedDate(new Date().toISOString().split('T')[0]); // Default to today
        setSelectedShowtime(null);
        setStep('showtimes');
    }, []);

    const handleShowtimeSelect = useCallback((theater: string, date: string, showtime: Showtime) => {
        setSelectedTheater(theater);
        setSelectedDate(date);
        setSelectedShowtime(showtime);
        setStep('seats');
    }, []);

    const handleSeatsSelect = useCallback((seats: string[]) => {
        setSelectedSeats(seats);
    }, []);

    const handleProceedToPayment = useCallback(() => {
        if (selectedSeats.length > 0) {
            setStep('payment');
        } else {
            alert('Please select at least one seat.');
        }
    }, [selectedSeats]);

    const bookingDetails: Booking | null = selectedMovie && selectedCity && selectedTheater && selectedDate && selectedShowtime ? {
        movie: selectedMovie,
        city: selectedCity,
        theater: selectedTheater,
        date: selectedDate,
        showtime: selectedShowtime,
        seats: selectedSeats,
        totalPrice: selectedSeats.length * SEAT_PRICE_RUPEES,
    } : null;

    const handlePaymentSuccess = useCallback(() => {
        if (bookingDetails) {
            try {
                const historyJSON = localStorage.getItem('bookingHistory');
                const history: Booking[] = historyJSON ? JSON.parse(historyJSON) : [];
                const newBooking: Booking = { 
                    ...bookingDetails, 
                    bookingId: `CINE-${Date.now()}`, 
                    bookingDate: new Date().toISOString() 
                };
                history.unshift(newBooking);
                localStorage.setItem('bookingHistory', JSON.stringify(history.slice(0, 10))); // Store max 10 bookings
            } catch (error) {
                console.error("Could not save booking history:", error);
            }
        }
        setStep('confirmation');
    }, [bookingDetails]);

    const handleGoBack = useCallback(() => {
        setStep(prevStep => {
            if (prevStep === 'payment') return 'seats';
            if (prevStep === 'seats') return 'showtimes';
            if (prevStep === 'showtimes') return 'cities';
            if (prevStep === 'cities') return 'movies';
            return prevStep;
        });
    }, []);

    const handleReset = useCallback(() => {
        resetBookingState();
        setStep('movies');
    }, [resetBookingState]);

    const handleViewHistory = useCallback(() => {
        const action = () => setStep('history');
        if (!currentUser) {
            setPostLoginCallback(() => action);
            setStep('login');
        } else {
            action();
        }
    }, [currentUser]);


    const renderContent = () => {
        switch (step) {
            case 'login':
                return <LoginPage onLoginSuccess={handleLoginSuccess} />;
            case 'movies':
                return <MovieSelector movies={MOVIES} onMovieSelect={handleMovieSelect} />;
            case 'cities':
                return selectedMovie && <CitySelectionPage movie={selectedMovie} onCitySelect={handleCitySelect} onBack={() => setStep('movies')} />;
            case 'showtimes':
                return selectedMovie && selectedCity && <ShowtimePage movie={selectedMovie} city={selectedCity} onShowtimeSelect={handleShowtimeSelect} onBack={handleGoBack} />;
            case 'seats':
                 return bookingDetails && <SeatSelectionPage booking={bookingDetails} onSeatsSelect={handleSeatsSelect} onProceed={handleProceedToPayment} onBack={handleGoBack} />;
            case 'payment':
                return bookingDetails && <PaymentPage booking={bookingDetails} onPaymentSuccess={handlePaymentSuccess} onBack={handleGoBack} />;
            case 'confirmation':
                return bookingDetails && <ConfirmationPage booking={bookingDetails} onReset={handleReset} />;
            case 'history':
                return <BookingHistoryPage onBack={handleReset} />;
            default:
                return <LoginPage onLoginSuccess={handleLoginSuccess} />;
        }
    };

    return (
        <div className="min-h-screen bg-brand-bg font-sans flex flex-col">
            <Header 
                currentUser={currentUser}
                onSignOut={handleSignOut}
                onSignInClick={handleSignInClick}
                onHistoryClick={handleViewHistory}
            />
            <main className="container mx-auto px-4 py-8 flex-grow">
                {renderContent()}
            </main>
            {currentUser && <Footer />}
        </div>
    );
};

export default App;
