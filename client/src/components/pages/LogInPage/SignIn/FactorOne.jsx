import React, { useEffect } from 'react';
import { SignIn } from '@clerk/clerk-react';

const FactorOne = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn path="/sign-in" routing="path" afterSignInUrl="/main" />
    </div>
  );
};

export default FactorOne;