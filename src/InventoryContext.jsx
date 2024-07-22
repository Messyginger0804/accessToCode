import { createContext, useState } from 'react';

// Create Context
export const InventoryContext = createContext();

// Create a provider component
export const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState({
        productName: '',
        image_url: '',
        make: '',
        model: '',
        specs: {
            RAM: '',
            display: '',
            processor: '',
            storage: ''
        },
        id: null // Added id field for inventory
    });

    return (
        <InventoryContext.Provider value={{ inventory, setInventory }}>
            {children}
        </InventoryContext.Provider>
    );
};
