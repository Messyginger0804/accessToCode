import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductCard() {
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
        inventoryId: ''  // Add inventoryId to state
    });

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_PORT}/api/inventory/items`);
                console.log(response.data);
                if (response.data.length > 0) {
                    const firstItem = response.data[0];
                    setInventory({
                        productName: firstItem.make + ' ' + firstItem.model || '',
                        image_url: firstItem.image_url || '',
                        make: firstItem.make || '',
                        model: firstItem.model || '',
                        specs: firstItem.specs || {
                            RAM: '',
                            display: '',
                            processor: '',
                            storage: ''
                        },
                        inventoryId: firstItem.inventoryId || ''
                    });
                }
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        };

        fetchInventory();
    }, []);

    console.log(inventory);

    return (
        <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-lg p-8">
            {inventory.productName ? (
                <div>
                    <h2 className="text-xl font-bold mb-4">Giveaway Date</h2>
                    <p className="text-gray-300 mb-6">July 15, 2024</p>
                    <h2 className="text-xl font-bold mb-4">{inventory.productName}</h2>
                    <img src={inventory.image_url} alt={`${inventory.make} ${inventory.model}`} className="w-full rounded-lg mb-4" />
                    <div className="text-gray-300">
                        <p><span className="font-bold">RAM:</span> {inventory.specs.RAM}</p>
                        <p><span className="font-bold">Display:</span> {inventory.specs.display}</p>
                        <p><span className="font-bold">Processor:</span> {inventory.specs.processor}</p>
                        <p><span className="font-bold">Storage:</span> {inventory.specs.storage}</p>
                    </div>
                </div>
            ) : (
                <p className="text-gray-300">Loading inventory...</p>
            )}
        </div>
    );
}

export default ProductCard;
