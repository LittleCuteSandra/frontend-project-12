import { useState, useRef, useEffect } from "react";
import { Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useAddMessageMutation } from '../../services/messagesApi.js';

const MessageSendForm = ({ currentChannelID }) => {
  const { t } = useTranslation();
  const [buttonStatus, setButtonStatus] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [addMessage] = useAddMessageMutation();
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const submitForm = async () => {
    setButtonStatus('disabled');
    const body = filter.clean(inputMessage.trim());
    if (body) {
      const dataForServer = { body, channelId: currentChannelID, username: localStorage.getItem('username') };
      const response = await addMessage(dataForServer);
      if (Object.hasOwn(response, 'error')) {
        toast.error(t('notification.error'));
      }
    }
    setInputMessage('');
    setButtonStatus('');
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Formik initialValues={{ body: '' }} onSubmit={submitForm}>
        {({ handleSubmit }) => (
          <Form className="py-1 border rounded-2" onSubmit={handleSubmit}>
            <div className="input-group has-validation">
              <Form.Control
                name="body"
                aria-label="Новое сообщение"
                placeholder={t('messages.input')}
                className="border-0 p-0 ps-2"
                onChange={(e) => setInputMessage(e.target.value)}
                value={inputMessage}
                ref={inputEl}
              />
              <button type="submit" className={`btn btn-primary btn-group-vertical ${buttonStatus}`}>
                {t('messages.send')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageSendForm;
