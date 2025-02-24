import { useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import cn from 'classnames';
import { showModal } from '../../slices/modalSlice.js';

const ChannelButton = ({isChannelActive, channelId}) => {
  const dispatch = useDispatch();
  const handleRename = () => {
    dispatch(showModal({ type: 'rename', channelID: channelId }));
  };

  const handleRemove = () => {
    dispatch(showModal({ type: 'remove', channelID: channelId }));
  };

  const btnClass = cn('flex-grow-0', 'dropdown-toggle', 'dropdown-toggle-split', 'btn', {
    'btn-secondary': isChannelActive,
  });

  return (
    <>
      <Dropdown.Toggle split variant={isChannelActive ? '' : null} className={btnClass}>
        <span className="visually-hidden">Управление каналом</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleRemove}>Удалить</Dropdown.Item>
        <Dropdown.Item onClick={handleRename}>Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </>
  );
};

export default ChannelButton;
