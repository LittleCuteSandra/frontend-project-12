import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NotFoundPage from './components/pages/NotFound.jsx';
import LogInForm from './components/pages/LogInForm.jsx';
import SignUpForm from './components/pages/SignUpForm.jsx';
import HomePage from './components/pages/HomePage.jsx';
import routes from './utils/routes.js';

const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <Link to={routes.signUpPage()} className="navbar-brand">Hexlet Chat</Link>
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
