import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from "./app/store";
import { Provider } from 'react-redux';
import { ClerkProvider } from "@clerk/clerk-react";
import { heIL } from '@clerk/localizations';

const frontendApi = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || "";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={frontendApi} localization={heIL}>
      <Provider store={store}>
        <App />
      </Provider>
    </ClerkProvider>
  </React.StrictMode>
);
