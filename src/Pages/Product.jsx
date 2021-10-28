import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

function Product({ match, location }) {
  let history = useHistory();

  const query = queryString.parse(location.search);
  console.log(query ? null : null);

  const handleSave = () => history.push('/');

  return (
    <div className="container p-5">
      Product {match.params.id}
      <div className="save">
        <button onClick={handleSave} className="btn btn-primary btn-sm">
          Save
        </button>
      </div>
    </div>
  );
}

export default Product;
