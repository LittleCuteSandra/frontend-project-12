import { Link } from 'react-router-dom';
import notFoundImage from '../../../public/notFound.png';
import Header from '../Header.jsx';
import routes from '../../utils/routes.js';

const NotFoundPage = () => {
    return (
      <div className="h-100 bg-light">
        <div className="d-flex flex-column h-100">
          <Header />
          <div className="text-center">
            <img alt="Страница не найдена" className="img-fluid" src={notFoundImage} />
            <h1 className="h4 text-muted">Страница не найдена</h1>
            <p className="text-muted">Но вы можете перейти <Link to={routes.homePage()}>на главную страницу</Link></p>
          </div>
        </div>
      </div>
    );
};

export default NotFoundPage;
