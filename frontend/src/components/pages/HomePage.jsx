import ChannelsForm from '../ChannelsForm.jsx';
import Header from '../Header.jsx';

const HomePage = () => {
  return (
    <div className="h-100 bg-light">
      <div className="d-flex flex-column h-100">
        <Header />
        <ChannelsForm />
      </div>
    </div>
  );
};

export default HomePage;
