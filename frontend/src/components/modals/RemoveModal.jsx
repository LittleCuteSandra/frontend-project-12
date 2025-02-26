import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../services/channelsApi.js';
import { removeChannelInStore, setCurrentChannel } from '../../slices/channelsSlice.js';
import { removeMessagesInStore } from '../../slices/messagesSlice.js';
import { hideModal } from '../../slices/modalSlice.js';

const RemoveModal = ({show, channelID}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [removeChannel] = useRemoveChannelMutation();
  const { currentChannelID } = useSelector((state) => state.channel);

  const handleHide = () => {
    dispatch(hideModal());
  };

  const submitModal = async () => {
    const response = await removeChannel(channelID);
    if (Object.hasOwn(response, 'error')) {
      toast.error(t('notification.error'));
    } else {
      //dispatch(removeChannelInStore(response.data.id));
      dispatch(removeMessagesInStore(response.data.id));
      handleHide();
      if (currentChannelID === response.data.id) {
        dispatch(setCurrentChannel('1'));
      }
      toast.success(t('notification.delete'));
    }
  };

  return (
    <Modal show={show} onHide={handleHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.modal.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('channels.modal.sure')}</Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="secondary" className="me-2" onClick={handleHide}>{t('channels.modal.cancel')}</Button>
        <Button type="submit" variant="danger" onClick={submitModal}>{t('channels.modal.delete')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveModal;
