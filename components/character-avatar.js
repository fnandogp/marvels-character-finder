import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const imageNotAvailableUrl =
  'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

function CharacterAvatar({ url, size }) {
  if (url === imageNotAvailableUrl) {
    return (
      <Avatar
        shape="square"
        size={size}
        icon={<UserOutlined />}
        style={{ minWidth: '100%', maxWidth: '100%' }}
      />
    );
  }

  return (
    <Avatar
      shape="square"
      size={size}
      src={url}
      style={{ minWidth: '100%', maxWidth: '100%' }}
    />
  );
}

CharacterAvatar.defaultProps = {
  size: 400,
};

CharacterAvatar.propTypes = {
  url: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default CharacterAvatar;
