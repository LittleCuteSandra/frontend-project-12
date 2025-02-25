import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';
import routes from '../utils/routes.js';

const Header = () => {
  const { makeUserLoggedOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const logOutUser = () => {
    makeUserLoggedOut();
    navigate(routes.logInPage());
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link to={routes.homePage()} className="navbar-brand">{t('header.name')}</Link>
        {isLoggedIn && <button type="button" className="btn btn-primary" onClick={logOutUser}>{t('header.exit')}</button>}
      </div>
    </nav>
  );
};

export default Header;
