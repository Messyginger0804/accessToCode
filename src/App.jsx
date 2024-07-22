import { useState } from 'react';
import SignupForm from './components/SignupForm';
import CountdownTimer from './components/CountdownTimer';
import ProductCard from './components/ProductCard';
import Description from './components/Description';
import Admin from './components/Admin'; // Import Admin component

function App() {
  // State to manage which form to display
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to toggle form visibility
  const toggleForm = () => {
    setIsAdmin(prevState => !prevState);
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
      </div>

      <div className='flex flex-col lg:flex-row'>

        <div className="w-full lg:w-1/2 flex justify-center my-12">
          <ProductCard />
        </div>

        <div className="w-full lg:w-1/2 flex justify-center my-12">
          {isAdmin ? <Admin /> : <SignupForm />} {/* Conditionally render the form */}
        </div>

      </div>

      <div className="w-full flex justify-center m-12">
        <div className="max-w-full">
          <Description />
        </div>
      </div>

      {/* Button to toggle between SignupForm and Admin */}
    </div>
  );
}

export default App;
