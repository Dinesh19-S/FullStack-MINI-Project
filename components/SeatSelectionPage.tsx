
import React from 'react';
import { Booking } from '../types';
import SeatSelector from './SeatSelector';
import BookingSummary from './BookingSummary';

interface SeatSelectionPageProps {
    booking: Booking;
    onSeatsSelect: (seats: string[]) => void;
    onProceed: () => void;
    onBack: () => void;
}

const SeatSelectionPage: React.FC<SeatSelectionPageProps> = ({ booking, onSeatsSelect, onProceed, onBack }) => {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <SeatSelector
                        selectedSeats={booking.seats}
                        onSeatsSelect={onSeatsSelect}
                        occupiedSeats={['A5', 'A6', 'C2', 'D8', 'F10', 'G1', 'G2', 'H5']}
                    />
                </div>
                <div className="lg:col-span-1">
                    <BookingSummary
                        booking={booking}
                        onBack={onBack}
                        onProceed={onProceed}
                        proceedButtonText="Proceed to Payment"
                        isProceedDisabled={booking.seats.length === 0}
                    />
                </div>
            </div>
        </div>
    );
};

export default SeatSelectionPage;
