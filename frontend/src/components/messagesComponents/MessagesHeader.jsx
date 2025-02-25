const MessagesHeader = ({ name, messagesNumber }) => {
  return (
    <div class="bg-light mb-4 p-3 shadow-sm small">
      <p class="m-0"><b># {name}</b></p>
      <span class="text-muted">{messagesNumber} сообщений</span>
    </div>
  );
};

export default MessagesHeader;
