import ChannelsForm from '../channelsComponents/ChannelsForm.jsx';
import Header from '../Header.jsx';
import { useState, useEffect } from "react";
import { Spinner } from 'react-bootstrap';
import { useGetChannelsMutation } from '../../services/channelsApi.js';
import { setChannels } from '../../slices/channelsSlice.js';
import { useDispatch } from 'react-redux';
import routes from '../../utils/routes.js';

const HomePage = () => {
  const dispatch = useDispatch();
  const [dataisLoading, setDataLoading] = useState(true);
  const [getChannels] = useGetChannelsMutation();

  useEffect(() => { // при авторизации, здесь происходит получение всех чатов и запись их в state channelsSlice
    const fetchData = async () => {
      const { data } = await getChannels(routes.channelsPath());
      //здесь ещё добавить получение сообщений
      dispatch(setChannels(data));
      setDataLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="h-100 bg-light">
      {dataisLoading ? <Spinner animation="grow" /> :
        (
          <div className="d-flex flex-column h-100">
            <Header />
            <div class="container h-100 my-4 overflow-hidden rounded shadow">
              <div class="row h-100 bg-white flex-md-row">
                <ChannelsForm />
              </div>
            </div>
          </div>
        )
      }  
    </div>
  );
};

export default HomePage;
