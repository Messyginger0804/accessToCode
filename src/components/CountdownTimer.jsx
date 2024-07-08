import { useState, useEffect } from 'react';
import axios from 'axios';

function CountdownTimer() {
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

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [winnerSelected, setWinnerSelected] = useState(null); // Changed to null to store the date

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

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, [winnerSelected]);

    const selectWinner = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_PORT}/api/clients/pick-winner`);
            if (response.status === 200) {
                setWinnerSelected(new Date()); // Store the current date/time as winner selected
                console.log('Winner selected:', response.data);
            } else {
                console.error('Failed to select winner:', response.statusText);
            }
        } catch (error) {
            console.error('Error selecting winner:', error);
        }
    };

    return (
        <div className="text-white text-center font-mono text-9xl rounded-lg bg-gray-800 shadow-lg p-4 flex justify-center gap-6 px-12">
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
            {winnerSelected && (
                <div className="text-lg text-yellow-300 mt-4">
                    Winner selected on {winnerSelected.toLocaleString()} {/* Display winner information here */}
                </div>
            )}
            <button onClick={() => selectWinner()}>click</button>
        </div>
    );
}

export default CountdownTimer;
