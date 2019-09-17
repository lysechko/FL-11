import React from 'react';

const Image = emoji => {

  return (
    <div className="emojipack">
      {emoji.char.slice(0, 3).map(item => (
        <span key={item.codes}>{item.char}</span>
      ))}
    </div>
  );
};

export default Image;
