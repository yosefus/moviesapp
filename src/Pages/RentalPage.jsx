import React from 'react';
import { Link } from 'react-router-dom';

export default function RentalPage({ match }) {
  return (
    <div className="container p-3">
      <h2> id num :</h2> {match.params.id} <br />
      <Link to="/movies">
        <button className="btn btn-lg btn-primary">Rent</button>
      </Link>
    </div>
  );
}
