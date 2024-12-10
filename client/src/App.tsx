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


// now:  /main/course/Weather/learn/7
// fix:  /main/course/A1/Weather/1  OR /main/course/A1/Weather/2 OR /main/course/A1/Weather/3
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Login />} />                          {/* "/" */}
        <Route path="dictionary" element={<Dictionary />} />         {/* "/dictionary" */}
        <Route path="main" element={<Main />} />                     {/* "/main" */}
        <Route path="main/course" element={<CoursesLayout />}>       
          <Route path=":name" element={<CoursesPage />} />           {/* "/main/course/A1 */}
          <Route path=":name" element={<LearnLayout />}>       
            <Route path=":lesson" element={<MainLearn />} />             {/* "/main/course/A1/:id" */}
          </Route>
        </Route>
      </Route>
    </>
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
