import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { InventoryContext } from '../InventoryContext'; // Import your context

function CountdownTimer() {
    const { inventory } = useContext(InventoryContext);
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [winnerSelected, setWinnerSelected] = useState(false); // Change to boolean for simplicity

    useEffect(() => {
        const currentDate = new Date();
        let targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 15);

        if (currentDate.getDate() >= 15) {
            targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 15);
        }

        const timer = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference <= 0 && !winnerSelected) {
                // Trigger winner selection process here
                selectWinner();
            }

            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [winnerSelected]);

    const selectWinner = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_PORT}/api/clients/pick-winner`, {
                inventoryId: inventory.id // Send inventoryId in the request
            });
            if (response.status === 200) {
                setWinnerSelected(true); // Update state to show winner message
            } else {
                console.error('Failed to select winner:', response.statusText);
            }
        } catch (error) {
            console.error('Error selecting winner:', error);
        }
    };

    return (
        <div className="text-center font-mono text-6xl rounded-lg bg-gray-800 shadow-lg p-4 flex flex-col items-center">
            {winnerSelected ? (
                <div className="text-4xl font-bold text-yellow-300">
                    We have a winner!!!
                </div>
            ) : (
                <>
                    <div className="text-white text-9xl flex gap-6">
                        {/* Render countdown timer */}
                        {timeLeft.days > 0 && (
                            <div className="mb-2">
                                <span className="font-bold">{formatTime(timeLeft.days)}</span> days{' '}
                            </div>
                        )}
                        <div>
                            <span className="font-bold">{formatTime(timeLeft.hours)}</span>:
                            <span className="font-bold">{formatTime(timeLeft.minutes)}</span>:
                            <span className="font-bold">{formatTime(timeLeft.seconds)}</span>
                        </div>
                    </div>
                    <button onClick={() => selectWinner()} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Select Winner
                    </button>
                </>
            )}
        </div>
    );
}

const calculateTimeLeft = () => {
    const currentDate = new Date();
    let targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 15);

    if (targetDate < currentDate) {
        targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 15);
    }

    const difference = targetDate - currentDate;
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    }

    return timeLeft;
};

const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
};

export default CountdownTimer;
