// components/WinnerDisplay.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function WinnerDisplay() {
    const [winner, setWinner] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the winner from your API
        const fetchWinner = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_PORT}/api/winner/latest`);
                setWinner(response.data.winner);
            } catch (error) {
                console.error('Error fetching winner:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWinner();
    }, []);

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                {loading ? (
                    <p>Loading...</p>
                ) : winner ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
                        <p className="text-lg mb-4">The winner is:</p>
                        <div className="mb-4">
                            <p className="text-lg font-semibold">Name: {winner.username}</p>
                            <p className="text-lg">Email: {winner.email}</p>
                            <p className="text-lg">LinkedIn: <a href={winner.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{winner.linkedin}</a></p>
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <p>No winner found.</p>
                )}
            </div>
        </div>
    );
}

export default WinnerDisplay;
