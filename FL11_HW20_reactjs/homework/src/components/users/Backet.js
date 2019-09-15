import React from 'react';
import ButtonPurchase from '../layout/ButtonPurchase';
import { Clear } from '@material-ui/icons';

const Backet = ({ choice, removeItems }) => {
  return (
    <div className="backet">
      <h2>Backet</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#eee',
          fontSize: 'inherit'
        }}
      >
        {choice &&
          choice.map((item, i) => (
            <div key={i}>
              <span>{item.price}</span>
              <span>{item.title}$</span>
              <span
                onClick={removeItems.bind(this, item.title)}
                className="clear"
              >
                <Clear
                  style={{
                    float: 'right',
                    color: '#ff0000'
                  }}
                >
                  clear
                </Clear>
              </span>
            </div>
          ))}
        <ButtonPurchase
          price={choice && choice.reduce((acc, val) => acc + val.title, 0)}
        />
      </div>
    </div>
  );
};

export default Backet;
