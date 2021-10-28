import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="bodypage">
      <div className="stage">
        <div className="table1"></div>
        <div className="pc"></div>
        <div className="cup"></div>
        <div className="cup-cover"></div>
        <div className="clock">
          <div className="marker-top"></div>
          <div className="marker-right"></div>
          <div className="marker-bottom"></div>
          <div className="marker-left"></div>
          <div className="pointer-min"></div>
          <div className="pointer-hour"></div>
          <div className="pointer"></div>
        </div>
        <div className="guy">
          <div className="hat">
            <div className="hat-hair"></div>
            <div className="hat-close"></div>
          </div>
          <div className="hair-left"></div>
          <div className="hair-middle"></div>
          <div className="hair-right"></div>
          <div className="ear-left"></div>
          <div className="ear-right"></div>
          <div className="face">
            <div className="eye"></div>
            <div className="eye"></div>
            <div className="nose"></div>
            <div className="mouth"></div>
          </div>
          <div className="neck"></div>
          <div className="body"></div>
        </div>
        <div className="book one"></div>
        <div className="book two"></div>
        <div className="book three"></div>
      </div>
    </div>
  );
}

export default Home;
