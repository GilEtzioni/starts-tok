import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

// react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Layouts
import RootLayout from './Layout/RootLayout';
import CoursesLayout from './Layout/CoursesLayout';

// Pages
import Main from './Pages/Main';
import Dictionary from './Pages/Dictionary';
import Login from './Pages/Login';
import CoursesPage from './Pages/CoursesPage';
// import MainLearn from './Main/MainLearn';
import FirstFront from './NewLessons/FirstLesson/FirstFront';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Login />} />                                 {/* "/" */}
        <Route path="dictionary" element={<Dictionary />} />                {/* "/dictionary" */}
        <Route path="main" element={<Main />} />                            {/* "/main" */}
        <Route path="main/course" element={<CoursesLayout />}>      
          <Route path=":name" element={<CoursesPage />} />                   {/* e.g:   "/main/course/A1" */}
          <Route path=":name/:lesson/:completed" element={<FirstFront />} />  {/* e.g:   "/main/course/A1/Greetings/1" */}
        </Route>
      </Route>
    </>
  )
);

const queryClient = new QueryClient(); // react query

const App: React.FC = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
