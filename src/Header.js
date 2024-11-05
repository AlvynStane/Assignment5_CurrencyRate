import { useState, useEffect } from 'react';
import './App.css';

const Header = () => {
    const [dateTime, setDateTime] = useState({ date: '', time: '' });

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const formattedDate = now.toLocaleString('en-GB', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
            }).toUpperCase();
            const formattedTime = now.toLocaleTimeString('en-GB', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: false 
            });
            setDateTime({ date: formattedDate, time: formattedTime });
        };
        updateDateTime();
        const intervalId =setInterval(updateDateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <header className="header">
            <h1>Currency Converter</h1>
            <div className="date-time">
                <div>{dateTime.date}</div>
                <div>{dateTime.time}</div>
            </div>
        </header>
    );
}

export default Header