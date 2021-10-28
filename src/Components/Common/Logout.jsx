import React, { useEffect } from 'react';
import './Logout.css';
import userService from '../../services/userServices';

export default function Logout() {
  useEffect(() => {
    setTimeout(() => {
      userService.logout();
      window.location = '/';
    }, 3000);
  }, []);

  return (
    <>
      <div className="logout">
        <h1 className="h12">
          <span>g</span>
          <span>o</span>
          <span>o</span>
          <span>o</span>
          <span>o</span>
          <span>d</span>
          <div>
            <span>b</span>
            <span>y</span>
            <span>e</span>
            <span>!</span>
            <span>!</span>
            <span>!</span>
          </div>
        </h1>
      </div>
    </>
  );
}
