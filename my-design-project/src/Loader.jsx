import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="lawcraft-spinner">
        <div className="inner-circle"></div>
        <div className="logo-text">LC</div>
      </div>
      <p className="loading-text">Lawcraft Academy იტვირთება...</p>
    </div>
  );
};

export default Loader;