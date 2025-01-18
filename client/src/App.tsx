// clerk js + react
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from "@clerk/clerk-react";

// react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// layouts
import RootLayout from './components/layout/RootLayout';
import CoursesLayout from './components/layout/CoursesLayout';

// pages
import Main from './components/pages/Main';
import Dictionary from './components/pages/DictionaryPage';
import CoursesPage from './components/pages/LessonsPage';
import  MainLearn from "./components/lessons/MainLearn";

// login
import SignUpContainer from './components/pages/LogInPage/SignUpContainer';
import SignInContainer from './components/pages/LogInPage/ֿSignInContainer';
import FactorOne from './components/pages/LogInPage/FactorOne';
import VerifyEmailAddress from './components/pages/LogInPage/VerifyEmailAddress';

// games
import MainWordle from './components/games/wordle/MainWordle';
import MainHangman from './components/games/hangman/MainHangman';
import MainSpeedGame from './components/games/speedGame/MainSpeedGame';

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


       <Route path="sign-up/verify-email-address" element={<VerifyEmailAddress />} />
       <Route path="sign-in/factor-one" element={<FactorOne />} />


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