import { useTranslation } from 'react-i18next';

const MessagesHeader = ({ name, messagesNumber }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b># {name}</b>
      </p>
      <span className="text-muted">{t('messages.counter.count', { count: messagesNumber })}</span>
    </div>
  );
};

export default MessagesHeader;
