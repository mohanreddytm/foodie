import React, { useEffect, useState } from 'react';

import FruitImage from '../FruitImage';

import './index.css';

const EveryItem = (props) => {
  const { name, price } = props;

  return (
    <li className="every-item-cont">
        <FruitImage fruitName={name} />
        <div className='every-item-name-cont'>
        <h1 className="every-item-name">{name}</h1>
        <div className='every-item-price-cont'>

            <p className="every-item-price">Price: {price}</p>
            <select className="every-item-quantity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>
        <button className="every-item-btn">Add to Cart</button>
      </div>
    </li>
  );
};

export default EveryItem;
