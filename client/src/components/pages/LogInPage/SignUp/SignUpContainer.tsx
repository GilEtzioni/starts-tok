import { useEffect } from "react";
import { SignUp, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignUpContainer = () => {

  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in"
      />
    </div>
  );
};

export default SignUpContainer;