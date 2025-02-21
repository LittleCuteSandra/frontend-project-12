import ChannelsForm from '../ChannelsForm.jsx';
import MessagesForm from '../MessagesForm.jsx';
import Header from '../Header.jsx';

const HomePage = () => {
  return (
    <div className="h-100 bg-light">
      <div className="d-flex flex-column h-100">
        <Header />
        <div class="container h-100 my-4 overflow-hidden rounded shadow">
          <div class="row h-100 bg-white flex-md-row">
            <ChannelsForm />
            <MessagesForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
