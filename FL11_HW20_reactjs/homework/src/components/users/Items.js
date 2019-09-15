import React from 'react';
import Item from './UserItem';

const Items = ({ users, handlerClick, disabled }) => {
  return (
    <div
      className="cardWraper"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}
    >
      {users &&
        users.map(user => (
          <Item
            key={user.id}
            user={user}
            handlerClick={handlerClick}
            disabled={disabled}
          />
        ))}
    </div>
  );
};

export default Items;
