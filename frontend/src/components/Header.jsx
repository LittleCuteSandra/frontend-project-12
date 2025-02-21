import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';
import routes from '../utils/routes.js';

const Header = () => {
  const { makeUserLoggedOut } = useAuth();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const logOutUser = () => {
    makeUserLoggedOut();
    navigate(routes.logInPage());
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link to={routes.homePage()} className="navbar-brand">Chat</Link>
        {isLoggedIn && <button type="button" className="btn btn-primary" onClick={logOutUser}>Выйти</button>}
      </div>
    </nav>
  );
};

export default Header;
