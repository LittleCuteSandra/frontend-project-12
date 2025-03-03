import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import ChannelsForm from '../channelsComponents/ChannelsForm.jsx';
import Header from '../Header.jsx';
import { useGetChannelsMutation } from '../../services/channelsApi.js';
import { useGetMessagesMutation } from '../../services/messagesApi.js';
import routes from '../../utils/routes.js';
import { setMessages, addMessageInStore, removeMessagesInStore } from '../../slices/messagesSlice.js';
import { setChannels, addChannelInStore, renameChannelInStore, removeChannelInStore } from '../../slices/channelsSlice.js';

const HomePage = () => {
  const dispatch = useDispatch();
  const [dataisLoading, setDataLoading] = useState(true);
  const [getChannels] = useGetChannelsMutation();
  const [getMessages] = useGetMessagesMutation();

  let socket = io();

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessageInStore(message));
    });

    socket.on('removeChannel', (channelId) => {
      dispatch(removeChannelInStore(channelId));
      dispatch(removeMessagesInStore(channelId));
    });

    socket.on('renameChannel', (updatedChannel) => {
      dispatch(renameChannelInStore(updatedChannel));
    });

    socket.on('newChannel', (channel) => {
      dispatch(addChannelInStore(channel));
    });

    return () => {
      socket.off('newMessage');
      socket.off('removeChannel');
      socket.off('renameChannel');
      socket.off('newChannel');
    };
  }, [dispatch, socket]);

  useEffect(() => {
    const fetchData = async () => {
      const channelResponse = await getChannels(routes.channelsPath());
      dispatch(setChannels(channelResponse.data));
      const messageResponse = await getMessages(routes.channelsPath());
      dispatch(setMessages(messageResponse.data));
      setDataLoading(false);
    };
    fetchData();
  }, [dispatch, getChannels, getMessages]);

  return (
    <div className="h-100 bg-light">
      {dataisLoading ? <Spinner animation="grow" />
      :
        (
          <div className="d-flex flex-column h-100">
            <Header />
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
              <div className="row h-100 bg-white flex-md-row">
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
