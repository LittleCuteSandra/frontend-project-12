import { useEffect, useRef } from 'react';
import { Formik, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {
  FloatingLabel, Form, Modal, Button
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useEditChannelMutation } from '../../services/channelsApi.js';
import channelValidationSchema from '../../utils/channelValidationSchema.js';
import { hideModal } from '../../slices/modalSlice.js';

const RenameModal = ({ show, channelID }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [editChannel] = useEditChannelMutation();
  const { channels } = useSelector((state) => state.channel);
  const channelsName = channels.map((channel) => channel.name);
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const handleHide = () => {
    dispatch(hideModal());
  };

  const submitForm = async (newChannelData) => {
    const response = await editChannel({ id: channelID, body: newChannelData });
    if (Object.hasOwn(response, 'error')) {
      toast.error(t('notification.error'));
    } else {
      handleHide();
      toast.success(t('notification.rename'));
    }
  };

  return (
    <Modal show={show} onHide={handleHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.modal.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik initialValues={{ name: '' }} validationSchema={channelValidationSchema(t, channelsName)} onSubmit={submitForm}>
          {({ handleSubmit, errors }) => (
            <Form onSubmit={handleSubmit}>
              <FloatingLabel className="mb-3" controlId="name" label={t('channels.modal.channelName')}>
                <Field
                  id="name"
                  type="text"
                  name="name"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  innerRef={inputEl}
                />
                {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
              </FloatingLabel>
              <div className="d-flex justify-content-end">
                <Button type="button" variant="secondary" className="me-2" onClick={handleHide}>{t('channels.modal.cancel')}</Button>
                <Button type="submit" variant="primary">{t('channels.modal.send')}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
