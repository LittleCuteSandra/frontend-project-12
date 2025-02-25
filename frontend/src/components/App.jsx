import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LogInForm from './pages/LogInPage.jsx';
import SignUpForm from './pages/SignUpPage.jsx';
import HomePage from './pages/HomePage.jsx';
import routes from '../utils/routes.js';

const App = () => {

  const Private = ({ children }) => {
    if (localStorage.getItem('token')) {
      return children;
    }
    return (
      <Navigate to={routes.logInPage()} replace={true} />
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.homePage()} element={
          <Private>
            <HomePage />
          </Private>
        }/>
        <Route path={routes.logInPage()} element={<LogInForm />} />
        <Route path={routes.signUpPage()} element={<SignUpForm />} />
        <Route path={routes.notFoundPage()} element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
