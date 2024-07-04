import React, { useState } from 'react';
import Address from '../components/Address';
import OrderSummary from '../components/OrderSummary';
import Payment from '../components/Payment';

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="p-4 px-40">
      {currentStep === 1 && <Address />}
      {currentStep === 2 && <OrderSummary />}
      {currentStep === 3 && <Payment />}
      <div className="mt-4 text-right">
        {currentStep < 3 && (
          <button
            onClick={goToNextStep}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
