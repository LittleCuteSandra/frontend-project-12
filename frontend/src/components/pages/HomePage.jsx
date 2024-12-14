import ChannelsForm from '../ChannelsForm.jsx';

import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">

        <div className="text-center">
          <Link to="/signup">Регистрация</Link>
        </div>

        <ChannelsForm />
      </div>
    </div>
  );
};

export default HomePage;
