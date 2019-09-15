import React from 'react';

const onClickHandler = e => {
  if (e.target) {
    e.target.setAttribute('disabled', true);
  }
};

const Button = ({ price, title, handlerClick, disabled }) => {
  return (
    <button
      className="getButton"
      onClick={e => {
        onClickHandler(e);
        handlerClick(price, title);
      }}
      style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#fff',
        display: 'block',
        backgroundColor: '#0080ff',
        padding: '10px 30px',
        borderRadius: '8px',
        border: 'none'
      }}
    >
      Get ({price}$)
    </button>
  );
};

export default Button;
