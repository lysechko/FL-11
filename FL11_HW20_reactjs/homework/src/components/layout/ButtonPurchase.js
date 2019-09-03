import React from 'react';

const onClickHandler = () => {
  alert('Purchase has been completed');
};
const ButtonPurchase = ({ price }) => {
  return (
    <button
      className="getButton"
      onClick={onClickHandler}
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
      Purchase ({price}$)
    </button>
  );
};

export default ButtonPurchase;
