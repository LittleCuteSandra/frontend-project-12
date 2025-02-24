import { useEffect, useRef } from "react";
import { Formik, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { FloatingLabel, Form, Modal, Button } from 'react-bootstrap';
import { useAddChannelMutation } from '../../services/channelsApi.js';
import channelValidationSchema from '../../utils/channelValidationSchema.js';
import { setCurrentChannel, addChannelInStore } from '../../slices/channelsSlice.js';
import { hideModal } from '../../slices/modalSlice.js';

const AddModal = ({ show }) => {
  const dispatch = useDispatch();
  const [addChannel] = useAddChannelMutation();
  const { channels } = useSelector((state) => state.channel);
  const channelsName = channels.map((channel) => channel.name);
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const handleHide = () => {
    dispatch(hideModal());
  };

  const submitForm = async (channelData) => {
    const response = await addChannel(channelData);
    if (Object.hasOwn(response, 'error')) {
      console.log(response.error);
    } else {
      dispatch(addChannelInStore(response.data));
      dispatch(setCurrentChannel(response.data.id));
      handleHide();
    }
  };

  return (
    <Modal show={show} onHide={handleHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik initialValues={{ name: '' }} validationSchema={channelValidationSchema(channelsName)} onSubmit={submitForm}>
          {({ handleSubmit, errors }) => (
            <Form onSubmit={handleSubmit}>
              <FloatingLabel className="mb-3" controlId="name" label="Название канала">
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

export default AddModal;
