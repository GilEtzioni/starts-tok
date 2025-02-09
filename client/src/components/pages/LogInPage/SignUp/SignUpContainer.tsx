import { SignUp } from "@clerk/clerk-react";
import StartsTokLogo from "../SignIn/StartsTokLogo";
import { Link } from "react-router-dom";

const SignUpContainer = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100" dir="rtl">
      <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md text-center">
      <StartsTokLogo />
        <SignUp
            path="/sign-up" 
            routing="path" 
            signInUrl="/sign-in"
            appearance={{
              variables: { colorPrimary: "#2563eb" },
              layout: {
                socialButtonsVariant: "iconButton",
              },
              elements: {
                footer: "hidden",
                rootBox: "w-full flex justify-center text-right",
                card: "shadow-lg p-6 rounded-lg bg-white",
                headerTitle: "text-gray-800 font-bold text-xl text-center",
                headerSubtitle: "hidden",
                formFieldInput:
                  "border border-gray-300 rounded-lg px-4 py-2 w-full text-right focus:ring-2 focus:ring-green-500",
                formFieldLabel: "text-gray-700 font-medium text-right",
                formButtonPrimary:
                "bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 border border-green-600 focus:ring-2 focus:ring-green-500 focus:border-green-600",            
              },
            }}
          />
        <div className="mt-4 flex justify-center items-center">
          <p className="text-gray-600"> יש לך חשבון? </p>
          <span className="mx-1"></span> 
          <Link to="/sign-in">
            <p className="text-blue-500 font-semibold hover:underline cursor-pointer ">
              כניסה
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpContainer;