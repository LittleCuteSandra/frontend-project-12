import { useDispatch } from 'react-redux';
import { setUserLoggedIn, setUserLoggedOut } from '../slices/authorizationSlice.js';

const useAuth = () => {
  const dispatch = useDispatch();

  const makeUserLoggedIn = ({ username, token }) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    dispatch(setUserLoggedIn({ username, token }));
  };

  const makeUserLoggedOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    dispatch(setUserLoggedOut());
  };

  return { makeUserLoggedIn, makeUserLoggedOut };
};

export default useAuth;
