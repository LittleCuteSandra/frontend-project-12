import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';
import { addMessageInStore } from '../slices/messagesSlice.js';
import filter from 'leo-profanity';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LogInForm from './pages/LogInPage.jsx';
import SignUpForm from './pages/SignUpPage.jsx';
import HomePage from './pages/HomePage.jsx';
import routes from '../utils/routes.js';
import { Provider as RollBarProvider, ErrorBoundary } from '@rollbar/react';

const rollbar = {
  accessToken: localStorage.getItem('token'),
  environment: 'testenv',
};

const socket = io();

/*socket.on('newChannel', (channel) => {
  store.dispatch(newChannel(channel));
  toast.success(i18nextInstance.t('toasts.create'), { closeOnClick: true, toastId: '1' });
});
socket.on('removeChannel', ({ id }) => {
  const { active } = store.getState().channels;
  if (active === id) store.dispatch(setActive('1'));
  store.dispatch(removeChannel(id));
  toast.success(i18nextInstance.t('toasts.delete'), { toastId: '2' });
});
socket.on('renameChannel', (channel) => {
  const changes = { name: channel.name };
  store.dispatch(updateChannel({ id: channel.id, changes }));
  toast.success(i18nextInstance.t('toasts.edit'), { toastId: '3' });
});*/
socket.on('addMessageInStore', (message) => {
  store.dispatch(addMessageInStore(message));
});
/*socket.on('removeMessage', ({ id }) => {
  store.dispatch(removeMessage(id));
});*/

const App = () => {
  filter.loadDictionary('en');
  const ruLng = filter.getDictionary('ru');
  filter.add(ruLng);
  //LeoProfanity.remove('boob');
  //LeoProfanity.add('boobs');

  const Private = ({ children }) => {
    if (localStorage.getItem('token')) {
      return children;
    }
    return (
      <Navigate to={routes.logInPage()} replace={true} />
    );
  };

  return (
    <RollBarProvider config={rollbar}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path={routes.homePage()} element={
              <Private>
                <HomePage />
              </Private>
            } />
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
