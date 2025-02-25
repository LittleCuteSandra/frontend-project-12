import { useSelector } from 'react-redux';
import MessagesHeader from './MessagesHeader.jsx';
import MessageSendForm from './MessageSendForm.jsx';
import Message from './Message.jsx';

const MessagesForm = () => {
  const { channels } = useSelector((state) => state.channel);
  const { currentChannelID } = useSelector((state) => state.channel);
  const { messages } = useSelector((state) => state.message);

  const { name } = channels.find((channel) => channel.id === currentChannelID);

  const needMessages = messages.filter((message) => message.channelId === currentChannelID);

  return (
    <div class="col p-0 h-100">
      <div class="d-flex flex-column h-100">
        <MessagesHeader name={name} messagesNumber={needMessages.length} />
        <div id="messages-box" class="chat-messages overflow-auto px-5 ">
          {needMessages.map((message) => <Message message={message}/>)}
        </div>
        <MessageSendForm currentChannelID={currentChannelID} />
      </div>
    </div>
  );
};

export default MessagesForm;
