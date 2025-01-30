import { useEffect } from "react";
import { SignUp, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignUpContainer = () => {
  // const { isSignedIn } = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isSignedIn) {
  //     navigate("/sign-up/verify-email-address");
  //   }
  // }, [isSignedIn, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" forceRedirectUrl="llll" />
    </div>
  );
};

export default SignUpContainer;