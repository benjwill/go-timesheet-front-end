import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Timesheet from './components/Timesheet';
import TimeInstance from './components/TimeInstance';
import Home from './components/Home';
import Graph from './components/Graph';
import EditTime from './components/EditTime';
import ManageTimes from './components/ManageTimes';
import GraphQL from './components/GraphQL';
import Login from './components/Login';


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <Home/>},
      {
        path: "/timesheet",
        element:<Timesheet/>,
      },
      {
        path: "/timesheet/:id",
        element:<TimeInstance/>,
      },
      {
        path: "/Graph",
        element:<Graph/>,
      },
      {
        path: "/admin/times/0",
        element:<EditTime/>,
      },
      {
        path: "/manage-times",
        element:<ManageTimes/>,
      },
      {
        path: "/graphql",
        element:<GraphQL/>,
      },
      {
        path: "/login",
        element:<Login />,
      },
    ],
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

