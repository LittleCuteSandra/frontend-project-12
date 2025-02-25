const Message = ({ message }) => {
  return (
    <div class="text-break mb-2">
      <b>{message.username}</b>
      : {message.body}
    </div>
  );
};

export default Message;
