import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import cn from 'classnames';
import AddModal from '../modals/AddModal.jsx';
import RemoveModal from '../modals/RemoveModal.jsx';
import RenameModal from '../modals/RenameModal.jsx';
import ChannelButton from './ChannelButton.jsx';
import MessagesForm from '../messagesComponents/MessagesForm.jsx';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../../slices/channelsSlice.js';
import { showModal } from '../../slices/modalSlice.js';

const ChannelsForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channels } = useSelector((state) => state.channel);
  const { currentChannelID } = useSelector((state) => state.channel);

  const handleAdd = () => {
    dispatch(showModal({ type: 'add', channelId: '' }));
  };

  const renderChannels = (channel) => {
    const setChannelActive = () => {
      dispatch(setCurrentChannel(channel.id));
    };
    const isChannelActive = currentChannelID === channel.id;
    const btnClass = cn('w-100', 'rounded-0', 'text-start', 'btn', {
      'btn-secondary': isChannelActive,
    });
    return (<ListGroup.Item as="il" key={channel.id} action className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <button type="button" className={btnClass} onClick={isChannelActive ? null : setChannelActive}>
          <span className="me-1">#</span>
          {channel.name}
        </button>
        {channel.removable && <ChannelButton isChannelActive={isChannelActive} channelId={channel.id} />}
      </Dropdown>
    </ListGroup.Item>);
  };

  const { type, isShown, channelID } = useSelector((state) => state.modal);

  return (
    <>
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('channels.title')}</b>
          <Button variant="light" className="p-0 border-0" title="Добавить канал" onClick={handleAdd}>
            <span className="fs-5">+</span>
          </Button>
        </div>
        <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {channels.map(renderChannels)}
        </ul>
      </div>
      <MessagesForm />
      {type === 'add' && isShown && <AddModal show={isShown} />}
      {type === 'remove' && isShown && <RemoveModal show={isShown} channelID = {channelID} /> }
      {type === 'rename' && isShown && <RenameModal show={isShown} channelID={channelID} /> }
    </>
  );
};

export default ChannelsForm;
