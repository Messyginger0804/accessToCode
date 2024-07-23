// App.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import SignupForm from './components/SignupForm';
import CountdownTimer from './components/CountdownTimer';
import ProductCard from './components/ProductCard';
import Description from './components/Description';
import Admin from './components/Admin';
import Inventory from './components/Inventory';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [inventory, setInventory] = useState(null); // New state for inventory data

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PORT}/api/inventory/items`);
        if (response.data.length > 0) {
          setInventory(response.data[0]); // Assuming you want to use the first item
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, []);

  const toggleForm = () => {
    setIsAdmin(prevState => !prevState);
  };

  const toggleInventory = () => {
    setShowInventory(prevState => !prevState);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white">
      <div className="w-full">
        <CountdownTimer />
      </div>
      <div className="w-full flex justify-center m-4">
        <button
          onClick={toggleForm}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          {isAdmin ? 'Switch to Signup Form' : 'Switch to Admin Form'}
        </button>
        <button
          onClick={toggleInventory}
          className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 ml-4"
        >
          {showInventory ? 'Back to Main View' : 'Show Inventory'}
        </button>
      </div>

      {showInventory ? (
        <div className="w-full">
          <Inventory inventory={inventory} />
        </div>
      ) : (
        <div className='flex flex-col lg:flex-row'>
          <div className="w-full lg:w-1/2 flex justify-center my-12">
            {inventory ? (
              <ProductCard item={inventory} />
            ) : (
              <p className="text-gray-300">Loading product...</p>
            )}
          </div>

          <div className="w-full lg:w-1/2 flex justify-center my-12">
            {isAdmin ? <Admin /> : <SignupForm />}
          </div>
        </div>
      )}

      {!showInventory && (
        <div className="w-full flex justify-center m-12">
          <div className="max-w-full">
            <Description />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;