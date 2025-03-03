import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
//import { useEffect } from "react";
//import { useSelector, useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

//import io from 'socket.io-client';
//import { addMessageInStore, removeMessagesInStore } from '../slices/messagesSlice.js';
//import { addChannelInStore, renameChannelInStore, removeChannelInStore } from '../slices/channelsSlice.js';

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

const App = () => {
  /*let socket = io();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessageInStore(message));
    });

    socket.on('removeChannel', (channelId) => {
      dispatch(removeChannelInStore(channelId));
      dispatch(removeMessagesInStore(channelId));
    });

    socket.on('renameChannel', (updatedChannel) => {
      dispatch(renameChannelInStore(updatedChannel));
    });

    socket.on('newChannel', (channel) => {
      dispatch(addChannelInStore(channel));
    });

    return () => {
      socket.off('newMessage');
      socket.off('removeChannel');
      socket.off('renameChannel');
      socket.off('newChannel');
    };
  }, [dispatch, socket]);*/

  filter.loadDictionary('en');
  const ruLng = filter.getDictionary('ru');
  filter.add(ruLng);
  //filter.remove('boob');
  //filter.add('boobs');

  const Private = ({ children }) => {
    if (localStorage.getItem('token')) {
      return children;
    }
    return (
      <Navigate to={routes.logInPage()} replace={true} />
    );
  };

  /*function TestError() {
    const b = null;
    return b.hello(); <TestError />
  }*/


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
