import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import notFoundImage from '../../../public/notFound.png';
import Header from '../Header.jsx';
import routes from '../../utils/routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="h-100 bg-light">
      <div className="d-flex flex-column h-100">
        <Header />
        <div className="text-center">
          <img alt="Страница не найдена" className="img-fluid" src={notFoundImage} />
          <h1 className="h4 text-muted">{t('notFound.notSuchPage')}</h1>
          <p className="text-muted">
            {t('notFound.go')}
            <Link to={routes.homePage()}>{t('notFound.main')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
