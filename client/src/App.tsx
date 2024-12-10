import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

// Layout
import RootLayout from './Layout/RootLayout';
import CoursesLayout from './Layout/CoursesLayout';

// Pages
import Main from './Pages/Main';
import Dictionary from './Pages/Dictionary';
import Login from './Pages/Login';
import CoursesPage from './Pages/CoursesPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>                         
        <Route index element={<Login />} />                             { "/" }
        <Route path="dictionary" element={<Dictionary />} />            { "/dictionary" }
        <Route path="main" element={<Main />} />                        { "/main" }
        <Route path="main/course" element={<CoursesLayout />}>          
          <Route path=":name" element={<CoursesPage/>} />               { "/main/course/:name" }
        </Route>
      </Route>
    </>
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
