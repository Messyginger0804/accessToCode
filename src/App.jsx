import { useState, useEffect } from 'react';
import axios from 'axios';
import SignupForm from './components/SignupForm';
import Admin from './components/Admin';
import CountdownTimer from './components/CountdownTimer';
import Description from './components/Description';
import ProductCard from './components/ProductCard';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleForm = () => {
    setIsAdmin(prevState => !prevState);
    console.log(inventory.id)
  };

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
    <div className="flex flex-col items-center min-h-screen bg-black text-white">
      <div className="w-full flex flex-col items-center">
        {/* Countdown Timer Component */}
        <CountdownTimer />

        {/* Toggle Button */}
        <button
          onClick={toggleForm}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 mt-4"
        >
          {isAdmin ? 'Switch to Signup Form' : 'Switch to Admin Form'}
        </button>
      </div>

      {/* Display ProductCard and SignupForm side by side */}
      <div className='w-full lg:flex lg:justify-center mt-12'>
        {!isAdmin && (
          <div className="flex-1 lg:max-w-md p-4">
            {loading ? (
              <p className="text-gray-300">Loading product...</p>
            ) : inventory ? (
              <ProductCard item={inventory} />
            ) : (
              <p className="text-gray-300">No product available.</p>
            )}
          </div>
        )}

        <div className="flex-1 lg:max-w-md p-4">
          {isAdmin ? <Admin /> : <SignupForm />}
        </div>
      </div>

      {/* Only display Description when SignupForm is visible */}
      {!isAdmin && (
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
