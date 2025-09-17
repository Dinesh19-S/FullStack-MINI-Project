import React, { useState } from 'react';
import { Booking } from '../types';

interface PaymentFormProps {
    booking: Booking;
    onPaymentSuccess: () => void;
}

const InputField: React.FC<{ label: string; placeholder: string; type?: string }> = ({ label, placeholder, type = "text" }) => (
    <div>
        <label className="block text-sm font-medium text-brand-text-secondary mb-1">{label}</label>
        <input 
            type={type}
            placeholder={placeholder}
            className="w-full bg-brand-secondary border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary"
        />
    </div>
);

type PaymentMethod = 'card' | 'upi';

const PaymentForm: React.FC<PaymentFormProps> = ({ booking, onPaymentSuccess }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            onPaymentSuccess();
        }, 2000); // Simulate network delay
    };

    const renderCardForm = () => (
        <div className="space-y-6">
            <InputField label="Card Number" placeholder="**** **** **** ****" />
            <InputField label="Cardholder Name" placeholder="John Doe" />
            <div className="grid grid-cols-2 gap-6">
                <InputField label="Expiry Date" placeholder="MM/YY" />
                <InputField label="CVV" placeholder="***" type="password" />
            </div>
        </div>
    );

    const renderUpiForm = () => (
        <div className="flex flex-col items-center text-center py-4">
            <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=cinereserve@okhdfcbank&pn=CineReserve&am=${booking.totalPrice.toFixed(2)}&cu=INR`}
                alt="UPI QR Code"
                className="w-48 h-48 rounded-lg bg-white p-2 border-4 border-gray-600"
                aria-label="UPI Payment QR Code"
            />
            <p className="mt-4 text-brand-text-secondary">
                Scan the QR code with any UPI app to pay ₹{booking.totalPrice.toFixed(2)}.
            </p>
        </div>
    );

    return (
        <div className="bg-brand-surface p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-brand-primary">Secure Payment</h2>
            
            <div className="mb-6 flex border-b border-gray-700">
                <button 
                    role="tab"
                    aria-selected={paymentMethod === 'card'}
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 py-2 text-center font-semibold transition-colors duration-200 ${paymentMethod === 'card' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-secondary hover:text-white'}`}
                >
                    Credit/Debit Card
                </button>
                <button 
                    role="tab"
                    aria-selected={paymentMethod === 'upi'}
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex-1 py-2 text-center font-semibold transition-colors duration-200 ${paymentMethod === 'upi' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-secondary hover:text-white'}`}
                >
                    UPI / QR Code
                </button>
            </div>

            <form onSubmit={handlePayment}>
                <div className="min-h-[210px]">
                    {paymentMethod === 'card' ? renderCardForm() : renderUpiForm()}
                </div>

                <div className="pt-2">
                    <button 
                        type="submit"
                        disabled={isProcessing}
                        className="w-full text-center py-3 px-4 rounded-lg bg-brand-primary text-black font-bold text-lg hover:bg-yellow-400 transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isProcessing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            `Pay ₹${booking.totalPrice.toFixed(2)}`
                        )}
                    </button>
                </div>
            </form>
            <p className="text-xs text-center mt-4 text-brand-text-secondary">This is a simulated payment. No real transaction will occur.</p>
        </div>
    );
};

export default PaymentForm;
