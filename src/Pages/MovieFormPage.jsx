import React from 'react';
import { MoviesForm } from '../Components';

export default function MovieFormPage({ match }) {
  return (
    <div>
      <MoviesForm id={match.params.id} />
    </div>
  );
}
