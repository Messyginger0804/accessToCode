import React from 'react';
import SignupForm from './components/SignupForm';
import CountdownTimer from './components/CountdownTimer';
import ProductCard from './components/ProductCard';
import Description from './components/Description';

function App() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white">
      <div className="w-full">
        <CountdownTimer />
      </div>

      <div className='flex flex-col lg:flex-row'>

        <div className="w-full lg:w-1/2 flex justify-center my-12">
          <ProductCard />
        </div>

        <div className="w-full lg:w-1/2 flex justify-center my-12">
          <SignupForm />
        </div>

      </div>

      <div className="w-full flex justify-center m-12">
        <div className="max-w-full">
          <Description />
        </div>
      </div>
    </div>
  );
}

export default App;
