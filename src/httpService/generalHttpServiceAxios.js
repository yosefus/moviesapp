import axios from 'axios';
import { log } from '../services/ErrorLoger';
import { toast } from 'react-toastify';

// handle unexepted Erorrs
axios.interceptors.response.use(null, (error) => {
  const exeptedErorr = error.request && error.request.status >= 400 && error.request.status < 500;

  if (!exeptedErorr) {
    toast('something went wrong');
    log(error);
  }

  return Promise.reject(error);
});

// const ApiUrl = process.env.REACT_APP_API_URL || '/api';

export default async function req({ method, path, data }) {
  //   console.log(method, path, data);

  const { data: res } = await axios({
    method: method,
    // url: ApiUrl + path,
    // url: `/api${path}`,
    url: `http://localhost:3900/api${path}`,
    data: data,
  });

  //  console.log(res);

  return res;
}

export const getToken = (jwt) => (axios.defaults.headers.Authorization = jwt);
