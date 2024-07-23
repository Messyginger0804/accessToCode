// components/Inventory.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

function Inventory() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_PORT}/api/inventory/items`);
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching inventory:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_PORT}/api/inventory/items/${id}`);
            setItems((prevItems) => prevItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting inventory item:', error);
        }
    };

    return (
        <div className="flex flex-wrap justify-center gap-6 p-6">
            {loading ? (
                <p className="text-gray-300">Loading inventory...</p>
            ) : items.length === 0 ? (
                <p className="text-gray-300">No inventory items available.</p>
            ) : (
                items.map((item) => (
                    <div key={item.id} className="relative">
                        <ProductCard item={item} />
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default Inventory;
