import React from 'react';
import './Message.css';

const Message = ({ text, type }) => {
  return (
    <div className={`message message--${type}`}>
      {text}
    </div>
  );
};

export default Message;