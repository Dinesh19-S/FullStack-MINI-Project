
import React from 'react';

interface SeatSelectorProps {
    selectedSeats: string[];
    occupiedSeats: string[];
    onSeatsSelect: (seats: string[]) => void;
}

const Seat: React.FC<{ id: string; status: 'available' | 'occupied' | 'selected'; onClick: () => void }> = ({ id, status, onClick }) => {
    const baseClasses = "w-8 h-8 rounded-md flex items-center justify-center font-bold text-xs transition-colors duration-200";
    let statusClasses = "";
    switch (status) {
        case 'available':
            statusClasses = "bg-gray-600 hover:bg-gray-500 cursor-pointer";
            break;
        case 'occupied':
            statusClasses = "bg-gray-800 text-gray-600 cursor-not-allowed";
            break;
        case 'selected':
            statusClasses = "bg-brand-primary text-black cursor-pointer";
            break;
    }
    return <div className={`${baseClasses} ${statusClasses}`} onClick={status !== 'occupied' ? onClick : undefined}>{id.substring(1)}</div>;
};

const SeatSelector: React.FC<SeatSelectorProps> = ({ selectedSeats, occupiedSeats, onSeatsSelect }) => {
    const handleSeatClick = (seatId: string) => {
        const isSelected = selectedSeats.includes(seatId);
        let newSelectedSeats: string[];
        if (isSelected) {
            newSelectedSeats = selectedSeats.filter(s => s !== seatId);
        } else {
            newSelectedSeats = [...selectedSeats, seatId];
        }
        onSeatsSelect(newSelectedSeats);
    };

    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const cols = Array.from({ length: 12 }, (_, i) => i + 1);

    const renderSeats = () => {
        return rows.map(row => (
            <div key={row} className="flex items-center justify-center space-x-2">
                <div className="w-6 font-bold text-brand-text-secondary">{row}</div>
                {cols.map(col => {
                    const seatId = `${row}${col}`;
                    const isOccupied = occupiedSeats.includes(seatId);
                    const isSelected = selectedSeats.includes(seatId);
                    const status = isSelected ? 'selected' : isOccupied ? 'occupied' : 'available';
                    
                    if (col === 3 || col === 9) {
                        return (
                            <React.Fragment key={seatId}>
                                <div className="w-4"></div>
                                <Seat id={seatId} status={status} onClick={() => handleSeatClick(seatId)} />
                            </React.Fragment>
                        );
                    }
                    return <Seat key={seatId} id={seatId} status={status} onClick={() => handleSeatClick(seatId)} />;
                })}
                 <div className="w-6 font-bold text-brand-text-secondary">{row}</div>
            </div>
        ));
    };

    return (
        <div className="bg-brand-surface p-6 rounded-lg flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6 text-brand-primary">Choose Your Seats</h2>
            
            <div className="w-full max-w-2xl bg-black/50 py-2 rounded-t-full mb-8 text-center text-gray-400 font-semibold tracking-widest">
                SCREEN
            </div>

            <div className="space-y-2 mb-8">
                {renderSeats()}
            </div>

            <div className="flex space-x-6">
                <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-gray-600 rounded"></div>
                    <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-brand-primary rounded"></div>
                    <span className="text-sm">Selected</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-gray-800 rounded"></div>
                    <span className="text-sm">Occupied</span>
                </div>
            </div>
        </div>
    );
};

export default SeatSelector;
