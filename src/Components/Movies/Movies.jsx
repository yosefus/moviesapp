// react
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

// components
import { Pagination, ItemsSelector, MoviesTable } from '../';

// functions
import { Paginate } from '../../Utils/Paginate';
import _ from 'lodash';
import { getMovies, getGenres, deleteMovie } from './../../services/moviesServices';
import { toast } from 'react-toastify';
import { userContext } from '../../App';

function Movies() {
  const userState = useContext(userContext),
    [user] = userState;

  const [movies, setMovies] = useState([]),
    [pageSize] = useState(4),
    [currentPage, setCurrentPage] = useState(1),
    [genres, setGenres] = useState([]),
    [selectedGenre, setSelectedGenre] = useState(),
    [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' }),
    [searchQuery, setSearchQuery] = useState();

  useEffect(() => {
    getTheMoviesAndGenres();
  }, []);

  // useEffect(() => {
  //   console.log(movies);
  // }, [movies]);

  // get all of the data - (movies + genres) from the server
  async function getTheMoviesAndGenres() {
    const res = await getMovies();
    setMovies(res);
    const resGenres = await getGenres();
    resGenres && setGenres([{ _id: '', name: 'All genres' }, ...resGenres]);
  }

  // take the path choicing and set the sort state
  const handleSort = (sortCol) => setSortColumn(sortCol);

  // onChange of input - set the search state- filter the form-state
  const onSearch = (query) => {
    setSelectedGenre();
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // delete movie onClick -
  const handleDeleteMovie = async (id) => {
    const orginalMovies = [...movies];
    setMovies((movies) => movies.filter((movieTemp) => movieTemp._id !== id));
    try {
      await deleteMovie({ id });
    } catch (error) {
      if (error.response && error.response.status === 404) toast.error('This Movie Already Been Deleted!');
      if (error.response && error.response.status === 400) toast.info('This Movie Already Been Deleted!');
      setMovies(orginalMovies);
    }
  };

  // TODO
  const handleLike = (movie) => {
    const tempMovies = [...movies];
    const index = tempMovies.indexOf(movie);
    tempMovies[index].liked = !tempMovies[index].liked;
    setMovies(tempMovies);
  };

  const onPageChange = (page) => setCurrentPage(page);

  const onChangeGenres = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  // the function to give the ui the right movies in the right order
  const filteredByGenre =
    selectedGenre && selectedGenre._id !== ''
      ? movies.filter((m) => m.genre._id === selectedGenre._id)
      : movies;

  const columnOrderBy = _.orderBy(filteredByGenre, [sortColumn.path], [sortColumn.order]);

  const searchMovies = searchQuery
    ? movies.filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : columnOrderBy;

  const currentMovies = Paginate(searchMovies, currentPage, pageSize);

  const { length } = filteredByGenre ? filteredByGenre : 0;

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-9">
          <MoviesTable
            length={length}
            currentMovies={currentMovies}
            sortColumn={sortColumn}
            onDelete={handleDeleteMovie}
            onLike={handleLike}
            onSort={handleSort}
            onSearch={onSearch}
          />

          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            moviesLength={length}
            onPageChange={onPageChange}
          />
        </div>

        <div className="col-md-2 col-sm-12 p-3">
          <ItemsSelector selectedItem={selectedGenre} items={genres} onSelectItems={onChangeGenres} />
        </div>
      </div>
      {user && (
        <div>
          <Link to="/movies/new">
            <button className="btn btn-primary">Add A New One </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Movies;
