import React, { useState, useEffect } from 'react';

function CountdownTimer() {
    // Get the current date
    const currentDate = new Date();

    // Get the month and year of the next month
    let nextMonth = currentDate.getMonth() + 1;
    let nextYear = currentDate.getFullYear();
    if (nextMonth === 12) {
        nextMonth = 0; // January
        nextYear++; // Increment the year
    }

    // Set the target date to be the 9th of the next month
    const targetDate = new Date(nextYear, nextMonth, 9);

    const calculateTimeLeft = () => {
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

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
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
        </div>
    );
}

export default CountdownTimer;
