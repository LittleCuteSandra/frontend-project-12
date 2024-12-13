import { Link } from 'react-router-dom';
import notFoundImage from '../../../public/notFound.png';

const NotFoundPage = () => {
    return (
      <div className="text-center">
        <img alt="Страница не найдена" className="img-fluid" src={notFoundImage} />
        <h1 className="h4 text-muted">Страница не найдена</h1>
        <p className="text-muted">Но вы можете перейти <Link to="/">на главную страницу</Link></p>
      </div>
    );
};

export default NotFoundPage;
