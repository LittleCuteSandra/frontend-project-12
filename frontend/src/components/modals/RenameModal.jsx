import { useEffect, useRef } from "react";
import { Formik, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { FloatingLabel, Form, Modal, Button } from 'react-bootstrap';
import { useEditChannelMutation } from '../../services/channelsApi.js';
import channelValidationSchema from '../../utils/channelValidationSchema.js';
import { renameChannelInStore } from '../../slices/channelsSlice.js';
import { hideModal } from '../../slices/modalSlice.js';

const RenameModal = ({show, channelID}) => {
  const dispatch = useDispatch();
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
      console.log(response.error);
    } else {
      dispatch(renameChannelInStore({ id: response.data.id, name: response.data.name}));
      handleHide();
    }
  };

  return (
    <Modal show={show} onHide={handleHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik initialValues={{ name: '' }} validationSchema={channelValidationSchema(channelsName)} onSubmit={submitForm}>
          {({ handleSubmit, errors }) => (
            <Form onSubmit={handleSubmit}>
              <FloatingLabel className="mb-3" controlId="name" label="Новое название канала">
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
                <Button type="button" variant="secondary" className="me-2" onClick={handleHide}>Отменить</Button>
                <Button type="submit" variant="primary">Отправить</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
