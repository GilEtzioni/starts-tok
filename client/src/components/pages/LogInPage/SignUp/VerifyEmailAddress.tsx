import { SignUp } from '@clerk/clerk-react';

const VerifyEmailAddress = () => {

  return (
    <div className="flex justify-center items-center min-h-screen">
    <SignUp 
      path="/sign-up" 
      routing="path" 
      signInUrl="/sign-in" 
      forceRedirectUrl="/sign-up/verify-email-address/create-db"
    />
 </div>
  );
};

export default VerifyEmailAddress;