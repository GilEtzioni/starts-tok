import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from "./app/store";
import { Provider } from 'react-redux';
import { ClerkProvider } from "@clerk/clerk-react";

const frontendApi = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || "pk_live_Y2xlcmsuc3RhcnRzdG9rLmNvbSQ" || "";

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
