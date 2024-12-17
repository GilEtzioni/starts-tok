import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

// Layouts
import RootLayout from './Layout/RootLayout';
import CoursesLayout from './Layout/CoursesLayout';
import LearnLayout from './Layout/LearnLayout';

// Pages
import Main from './Pages/Main';
import Dictionary from './Pages/Dictionary';
import Login from './Pages/Login';
import CoursesPage from './Pages/CoursesPage';
import MainLearn from './Main/MainLearn';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Login />} />                         {/* "/" */}
        <Route path="dictionary" element={<Dictionary />} />        {/* "/dictionary" */}
        <Route path="main" element={<Main />} />                    {/* "/main" */}
        <Route path="main/course" element={<CoursesLayout />}>      
          <Route path=":name" element={<CoursesPage />} />          {/* "/main/course/A1" */}
          <Route path=":name/:lesson/:completed" element={<MainLearn />} /> 
          {/* "/main/course/A1/Greetings/1" */}
        </Route>
      </Route>
    </>
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
