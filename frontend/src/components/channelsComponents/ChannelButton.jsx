import { useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { showModal } from '../../slices/modalSlice.js';

const ChannelButton = ({ isActive, channelId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleRename = () => {
    dispatch(showModal({ type: 'rename', channelID: channelId }));
  };

  const handleRemove = () => {
    dispatch(showModal({ type: 'remove', channelID: channelId }));
  };

  const btnClass = cn('flex-grow-0', 'dropdown-toggle', 'dropdown-toggle-split', 'btn', {
    'btn-secondary': isActive,
  });

  return (
    <>
      <Dropdown.Toggle split variant={isActive ? '' : null} className={btnClass}>
        <span className="visually-hidden">{t('channels.control')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleRemove}>{t('channels.delete')}</Dropdown.Item>
        <Dropdown.Item onClick={handleRename}>{t('channels.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </>
  );
};

export default ChannelButton;
