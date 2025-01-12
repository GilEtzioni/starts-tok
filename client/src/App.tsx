// clerk js + react
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from "@clerk/clerk-react";

// react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// layouts
import RootLayout from './layout/RootLayout';
import CoursesLayout from './layout/CoursesLayout';

// pages
import Main from './pages/Main';
import Dictionary from './pages/DictionaryPage';
import CoursesPage from './pages/LessonsPage';
import  MainLearn from "./lessons/MainLearn";

// login
import SignUpContainer from './pages/LogInPage/SignUpContainer';
import SignInContainer from './pages/LogInPage/ֿSignInContainer';

// games
import MainWordle from './games/wordle/MainWordle';
import MainHangman from './games/hangman/MainHangman';
import MainSpeedGame from './games/speedGame/MainSpeedGame';

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

        <Route path="wordle" element={<MainWordle />} />                  
        <Route path="speedGame" element={<MainSpeedGame />} />                
        <Route path="hangman" element={<MainHangman />} />  

        <Route path="dictionary" element={<Dictionary />} />                
        <Route path="main" element={<Main />} />                            
        <Route path="main/course" element={<CoursesLayout />}>      
          <Route path=":name" element={<CoursesPage />} />                  {/* e.g:   "/main/course/A1" */}
          <Route path=":name/:lesson/" element={<MainLearn />} />           {/* e.g:   "/main/course/A1/Greetings" */}
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
