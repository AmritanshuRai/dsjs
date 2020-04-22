import React from 'react';
import './loader.styles.scss';
const PlainLoader = () => (
  <>
    <div className='overlay'>
      <div className='loading'>
        <div></div>
        <div></div>
      </div>
    </div>
  </>
);

export default PlainLoader;
