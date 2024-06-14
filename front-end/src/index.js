import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Homepage from "./pages/Home/Homepage";
import Login from './pages/Login/Login';
import SignUp from './pages/Login/SignUp';
import Gamepage from './pages/Game/Gamepage';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/test" element={<p>Test</p>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/play" element={<Gamepage />} />
      </Routes>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();