import React, { useContext } from 'react';
import { TableHeader, TableBody, HeartLike } from './../';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';

function MoviesTable(props) {
  const { length, currentMovies, onDelete, onLike, onSort, sortColumn, onSearch } = props;
  const [user] = useContext(userContext);

  const columnArr = [
    {
      path: 'title',
      label: 'Title',
      content: (movie) => (
        <Link className="text-decoration-none titles" to={`/movies/${movie._id}`}>
          {movie.title}
        </Link>
      ),
    },
    { path: 'numberInStock', label: 'In Stock' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'delete',
      content: (movie) =>
        user?.isAdmin && (
          <button onClick={() => onDelete(movie._id)} className="btn btn-danger btn-sm">
            Delete
          </button>
        ),
    },
    {
      key: 'like',
      content: (movie) => <HeartLike onClick={() => onLike(movie)} like={movie.liked} />,
    },
  ];

  return (
    <>
      <div className="d-flex align-items-center m-4">
        <i className="fas fa-search "></i>
        <input
          onChange={(e) => onSearch(e.target.value)}
          style={{ maxWidth: 400 }}
          className="form-control m-2"
          type="text"
          placeholder="search..."
        />
      </div>

      <h4 className="text-center p-2 titles">
        {length > 0 ? `there is ${length} movies in stock right now` : 'there is no movies yet'}
      </h4>

      {length > 0 && (
        <table className="table">
          <TableHeader onSort={onSort} sortColumn={sortColumn} columnArr={columnArr} />
          <TableBody columnArr={columnArr} data={currentMovies} onDelete={onDelete} onLike={onLike} />
        </table>
      )}
    </>
  );
}

export default MoviesTable;
