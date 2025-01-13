import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const VerifyEmailAddress = () => {
 return (
  <div className="flex justify-center items-center min-h-screen">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
   </div>
 );
};

export default VerifyEmailAddress;