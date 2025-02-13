import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NotFoundPage from './pages/NotFound.jsx';
import LogInForm from './pages/LogInForm.jsx';
import SignUpForm from './pages/SignUpForm.jsx';
import HomePage from './pages/HomePage.jsx';
import routes from '../utils/routes.js';

const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <Link to={routes.homePage()} className="navbar-brand">Hexlet Chat</Link>
          </div>
        </nav>
        <Routes>
          <Route path={routes.notFoundPage()} element={<NotFoundPage />} />
          <Route path={routes.logInPage()} element={<LogInForm />} />
          <Route path={routes.signUpPage()} element={<SignUpForm />} />
          <Route path={routes.homePage()} element={<HomePage />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
