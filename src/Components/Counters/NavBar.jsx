import React from 'react';

function NavBar({ Items }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-md">
        <p className="navbar-brand">
          <span className="badge badge-pill bg-success p-2">{Items.length}</span>
        </p>
      </div>
    </nav>
  );
}

export default NavBar;
