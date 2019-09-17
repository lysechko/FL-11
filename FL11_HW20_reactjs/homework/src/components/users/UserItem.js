import React from 'react';
import Stars from '../layout/Stars';
import Button from '../layout/Button';
import Image from '../layout/Image';

const UserItem = props => {
  const { title, stars, price, emoji } = props.user;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Image style={{ display: 'inline' }} char={emoji}></Image>
      <div>{title}</div>
      <Stars stars={stars} />
      <Button price={price} title={title} handlerClick={props.handlerClick} />
    </div>
  );
};

export default UserItem;
