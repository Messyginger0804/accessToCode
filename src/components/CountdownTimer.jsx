import { useState, useEffect } from 'react';

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

    useEffect(() => {
        const currentDate = new Date();
        let targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 15);

        if (currentDate.getDate() >= 15) {
            targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 15);
        }

        const timer = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference < 0) {
                targetDate.setMonth(targetDate.getMonth() + 1);
                targetDate.setDate(15);
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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
        </div>
    );
}

export default CountdownTimer;
