import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NotFoundPage from './pages/NotFound.jsx';
import LogInForm from './pages/LogInForm.jsx';
import SignUpForm from './pages/SignUpForm.jsx';
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
