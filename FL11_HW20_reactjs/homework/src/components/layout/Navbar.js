import React from 'react';
import Button from '../layout/Button';

const Navbar = ({ users }) => {
  return (
    <div className="navbar">
      <div className="innernav">
        <h1>New!</h1>
        {users &&
          users
            .slice(3, 6)
            .map((user, i) => (
              <span key={user.id}>{user.emoji[i]['char']}</span>
            ))}

        <Button>Get</Button>
      </div>
    </div>
  );
};

export default Navbar;
