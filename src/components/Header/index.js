import React from 'react'
import './style.css';

const HeaderComp = ({texto}) => {
  return (
    <header>
      <h1>{texto}</h1>
    </header>
  );
}

export default HeaderComp;