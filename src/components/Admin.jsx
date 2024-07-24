import { useState, useEffect } from 'react';
import axios from 'axios';
import AddProduct from './AddProduct';
import Inventory from './Inventory';

const Admin = () => {
    const [inventory, setInventory] = useState([]);

    const fetchInventory = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_PORT}/api/inventory/items`);
            setInventory(response.data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    const refreshInventory = async () => {
        await fetchInventory();
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <div className="flex-grow p-8">
                <AddProduct refreshInventory={refreshInventory} />
            </div>
            <div className="bg-gray-800 p-8">
                <Inventory items={inventory} />
            </div>
        </div>
    );
};

export default Admin;
