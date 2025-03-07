import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import filter from 'leo-profanity';
import { Provider as RollBarProvider, ErrorBoundary } from '@rollbar/react';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LogInForm from './pages/LogInPage.jsx';
import SignUpForm from './pages/SignUpPage.jsx';
import HomePage from './pages/HomePage.jsx';
import routes from '../utils/routes.js';

const rollbarConfig = {
  accessToken: '1462a60aadbb463ba48230f2e7111ec1',
  environment: 'testenv',
};

function TestError() {
  const a = null;
  return a.hello();
}


const Private = ({ children }) => {
  if (localStorage.getItem('token')) {
    return children;
  }
  return (
    <Navigate to={routes.logInPage()} replace />
  );
};

const App = () => {
  filter.loadDictionary('en');
  const ruLng = filter.getDictionary('ru');
  filter.add(ruLng);

  return (
    <RollBarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <TestError />
        <BrowserRouter>
          <Routes>
            <Route
              path={routes.homePage()}
              element={(
                <Private>
                  <HomePage />
                </Private>
              )}
            />
            <Route path={routes.logInPage()} element={<LogInForm />} />
            <Route path={routes.signUpPage()} element={<SignUpForm />} />
            <Route path={routes.notFoundPage()} element={<NotFoundPage />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </ErrorBoundary>
    </RollBarProvider>
  );
};

export default App;
