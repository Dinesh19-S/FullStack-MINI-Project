
import React from 'react';
import { Booking } from '../types';
import PaymentForm from './PaymentForm';
import BookingSummary from './BookingSummary';

interface PaymentPageProps {
    booking: Booking;
    onPaymentSuccess: () => void;
    onBack: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ booking, onPaymentSuccess, onBack }) => {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <PaymentForm 
                        booking={booking}
                        onPaymentSuccess={onPaymentSuccess}
                    />
                </div>
                <div className="lg:col-span-1">
                    <BookingSummary
                        booking={booking}
                        onBack={onBack}
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
