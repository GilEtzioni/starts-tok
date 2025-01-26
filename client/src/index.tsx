import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from "./app/store";
import { Provider } from 'react-redux';
import { ClerkProvider } from "@clerk/clerk-react";


const frontendApi = "promoted-camel-14.clerk.accounts.dev"; // clerk development URL
// const frontendApi = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || "";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={frontendApi}>
      <Provider store={store}>
        <App />
      </Provider>
    </ClerkProvider>
  </React.StrictMode>
);
