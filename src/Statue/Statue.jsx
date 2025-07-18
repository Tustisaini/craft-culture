import React from 'react';
import pink from '../Components/Assets/pink.png';
import './Statue.css';


const Main = () => {
  return (
    <div className='main'>
      <img className="responsive-img" src={pink} alt="Statue" />
    </div>
  );
}

export default Main;
