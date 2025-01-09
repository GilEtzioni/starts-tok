// clerk js + react
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from "@clerk/clerk-react";

// react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// layouts
import RootLayout from './Layout/RootLayout';
import CoursesLayout from './Layout/CoursesLayout';

// pages
import Main from './Pages/Main';
import Dictionary from './Pages/Dictionary';
import CoursesPage from './Pages/CoursesPage';
import MainLearn from "./Lessons/MainLearn";
import SignUpContainer from './components/LogIn/SignUpContainer';
import SignInContainer from './components/LogIn/ֿSignInContainer';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>

        <Route
          index
          element={
            <>
              <SignedOut>
                <Navigate to="/sign-in" replace />
              </SignedOut>
              <SignedIn>
                <Navigate to="/main" replace />
              </SignedIn>
            </>
          }
        />

        <Route path="sign-in" element={<SignInContainer />} />
        <Route path="/sign-up" element={<SignUpContainer />} />


        <Route path="main" element={<Main />} />
        <Route path="dictionary" element={<Dictionary />} />
        <Route path="main/course" element={<CoursesLayout />}>
          <Route path=":name" element={<CoursesPage />} />
          <Route path=":name/:lesson/" element={<MainLearn />} />
        </Route>
      </Route>
    </>
  )
);

const queryClient = new QueryClient();

const App: React.FC = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
