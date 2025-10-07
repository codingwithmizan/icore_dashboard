import React from 'react';

const ForgotPassword = async () => {
  // Simulate a 1 second delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  return (
    <div className="text-center text-lg font-semibold">
      Forgot Password Page
    </div>
  );
};

export default ForgotPassword;
