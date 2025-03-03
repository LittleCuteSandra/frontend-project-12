import { useSelector } from 'react-redux';
import MessagesHeader from './MessagesHeader.jsx';
import MessageSendForm from './MessageSendForm.jsx';
import Message from './Message.jsx';

const MessagesForm = () => {
  const { channels } = useSelector((state) => state.channel);
  const { currentChannelID } = useSelector((state) => state.channel);
  const { messages } = useSelector((state) => state.message);
  const needChan = channels.find((channel) => channel.id === currentChannelID);
  const needMes = messages.filter((message) => message.channelId === currentChannelID);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader name={needChan ? needChan.name : null} messagesNumber={needMes.length} />
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {needMes.map((message) => <Message key={message.id} message={message} />)}
        </div>
        <MessageSendForm currentChannelID={currentChannelID} />
      </div>
    </div>
  );
};

export default MessagesForm;
