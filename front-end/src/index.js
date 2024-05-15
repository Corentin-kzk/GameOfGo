import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Homepage from "./pages/Home/Homepage";
import Login from './pages/Login/Login';
import Gamepage from './pages/Game/Gamepage';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Navbar/Navbar';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/test",
    element: <p>Test</p>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/play",
    element: <Gamepage />,
  },
]);

root.render(
  <React.StrictMode>
    {router.element === <Login /> ? null : <Navbar />}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
