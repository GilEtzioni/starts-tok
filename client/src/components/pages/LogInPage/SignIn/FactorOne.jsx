import { SignIn } from '@clerk/clerk-react';
import StartsTokLogo from './StartsTokLogo';

const FactorOne = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100" dir="rtl">
      <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md text-center">
      <StartsTokLogo />
      <SignIn
          path="/sign-in"
          routing="path"
          afterSignInUrl="/main"
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
      </div>
    </div>
  );
};

export default FactorOne;