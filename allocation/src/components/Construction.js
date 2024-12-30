import React from 'react';
import './Construction.css';
import constructionImage from '../assets/images/Construction.png';

const Construction = () => {
  return (
    <div className="construction-container">
      <img src={constructionImage} alt="Under Construction" className="construction-image" />
      <h1 className="construction-text">This page is still under construction</h1>
    </div>
  );
};

export default Construction;
