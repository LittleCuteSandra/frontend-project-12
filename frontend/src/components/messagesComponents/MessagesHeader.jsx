import { useTranslation } from 'react-i18next';

const MessagesHeader = ({ name, messagesNumber }) => {
  const { t } = useTranslation();
  return (
    <div class="bg-light mb-4 p-3 shadow-sm small">
      <p class="m-0"><b># {name}</b></p>
      <span class="text-muted">{t('messages.counter.count', { count: messagesNumber })}</span>
    </div>
  );
};

export default MessagesHeader;
