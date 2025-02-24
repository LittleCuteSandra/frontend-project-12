import {  useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useRemoveChannelMutation } from '../../services/channelsApi.js';
import { removeChannelInStore } from '../../slices/channelsSlice.js';
import { setCurrentChannel } from '../../slices/channelsSlice.js';
import { hideModal } from '../../slices/modalSlice.js';

const RemoveModal = ({show, channelID}) => {
  const dispatch = useDispatch();
  const [removeChannel] = useRemoveChannelMutation();
  const { currentChannelID } = useSelector((state) => state.channel);

  const handleHide = () => {
    dispatch(hideModal());
  };

  const submitModal = async () => {
    const response = await removeChannel(channelID);
    if (Object.hasOwn(response, 'error')) {
      console.log(response.error);
    } else {
      dispatch(removeChannelInStore(response.data.id));
      handleHide();
      if (currentChannelID === response.data.id) { // если пользователь в момент удаления находится в этом чате его перекидывает на general
        dispatch(setCurrentChannel('1'));
      }
      //добавить здесь еще удаление всех сообщений из этого канала
    }
  };

  return (
    <Modal show={show} onHide={handleHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>Уверены?</Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="secondary" className="me-2" onClick={handleHide}>Отменить</Button>
        <Button type="submit" variant="danger" onClick={submitModal}>Удалить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveModal;
