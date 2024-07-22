import { useState } from 'react';
import axios from 'axios';

const Admin = () => {
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        image_url: '',
        specs: {
            RAM: '',
            display: '',
            processor: '',
            storage: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('specs.')) {
            setFormData({
                ...formData,
                specs: {
                    ...formData.specs,
                    [name.split('.')[1]]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_PORT}/api/inventory/create`, formData);

            if (response.status === 201) {
                alert('Item added successfully!');
                setFormData({
                    make: '',
                    model: '',
                    image_url: '',
                    specs: {
                        RAM: '',
                        display: '',
                        processor: '',
                        storage: ''
                    }
                });
            } else {
                console.error('Failed to add item:', response.statusText);
                alert('Failed to add item.');
            }
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Error adding item.');
        }
    };

    const fetchInventory = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_PORT}/api/inventory/items`);
            console.log('Inventory items:', response.data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    return (
        <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-bold mb-4">Add New Inventory Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        id="make"
                        name="make"
                        value={formData.make}
                        onChange={handleChange}
                        placeholder="Make"
                        className="w-full p-2 rounded-lg bg-gray-800 text-gray-300"
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        placeholder="Model"
                        className="w-full p-2 rounded-lg bg-gray-800 text-gray-300"
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="image_url"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="w-full p-2 rounded-lg bg-gray-800 text-gray-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-300 mb-1">Specs</label>
                    <div className="space-y-2">
                        <div>
                            <input
                                type="text"
                                id="specs.RAM"
                                name="specs.RAM"
                                value={formData.specs.RAM}
                                onChange={handleChange}
                                placeholder="RAM"
                                className="w-full p-2 rounded-lg bg-gray-800 text-gray-300"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                id="specs.display"
                                name="specs.display"
                                value={formData.specs.display}
                                onChange={handleChange}
                                placeholder="Display"
                                className="w-full p-2 rounded-lg bg-gray-800 text-gray-300"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                id="specs.processor"
                                name="specs.processor"
                                value={formData.specs.processor}
                                onChange={handleChange}
                                placeholder="Processor"
                                className="w-full p-2 rounded-lg bg-gray-800 text-gray-300"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                id="specs.storage"
                                name="specs.storage"
                                value={formData.specs.storage}
                                onChange={handleChange}
                                placeholder="Storage"
                                className="w-full p-2 rounded-lg bg-gray-800 text-gray-300"
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
                    Add Item
                </button>
                <button
                    type="button"
                    onClick={fetchInventory}
                    className="w-full mt-4 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                >
                    Fetch Inventory
                </button>
            </form>
        </div>
    );
};

export default Admin;
