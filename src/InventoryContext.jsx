import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // Import PropTypes


// Create Context
export const InventoryContext = createContext();

// Create a provider component
export const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_PORT}/api/inventory/items`);
                if (response.data.length > 0) {
                    setInventory(response.data[0]); // Assuming you want to use the first item
                }
            } catch (error) {
                console.error('Error fetching inventory:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);

    return (
        <InventoryContext.Provider value={{ inventory, setInventory, loading }}>
            {children}
        </InventoryContext.Provider>
    );
};

InventoryProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensure 'children' is a required node
};