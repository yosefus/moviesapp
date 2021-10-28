import req from '../httpService/generalHttpServiceAxios';

export async function getMovies() {
  const movies = await req({ method: 'get', path: '/movie' });
  return movies;
}

export async function getMovie(id) {
  const movie = await req({ method: 'get', path: `/movie/${id}` });
  return movie;
}

export async function saveMovie({ id, data }) {
  console.log(id, data);
  const movie = await req({ method: 'put', path: `/movie/${id}`, data: data });
  return movie;
}

export async function deleteMovie({ id }) {
  const movie = await req({ method: 'put', path: `/deletemovie/${id}`, data: { deleted: true } });
  return movie;
}

export async function createMovie({ data }) {
  const movie = await req({ method: 'post', path: `/movie`, data: data });
  return movie;
}

export async function getGenres() {
  const genres = await req({ method: 'get', path: '/genre' });
  return genres;
}
