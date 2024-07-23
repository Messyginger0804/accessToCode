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

    return (
        <div className="flex flex-wrap justify-center gap-6 p-6">
            {loading ? (
                <p className="text-gray-300">Loading inventory...</p>
            ) : items.length === 0 ? (
                <p className="text-gray-300">No inventory items available.</p>
            ) : (
                items.map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))
            )}
        </div>
    );
}

export default Inventory;
