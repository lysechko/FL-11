import React from 'react';
import { Star } from '@material-ui/icons';
import { StarHalf } from '@material-ui/icons';

const Stars = ({ stars }) => {
  const keys = Array.from({ length: stars }).map((v, k) => k);
  const halfStar = !!(stars % 1);

  return (
    <div style={{ display: 'inline-block', color: '#ffd700' }}>
      {keys.map(item => (
        <Star key={item}>star_outline</Star>
      ))}
      {halfStar && <StarHalf>star_half</StarHalf>}
    </div>
  );
};

export default Stars;
