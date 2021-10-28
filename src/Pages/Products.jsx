import React from 'react';
import { Link } from 'react-router-dom';

function Products() {
  const links = [
    { name: 'Product 1', id: 1 },
    { name: 'Product 2', id: 2 },
    { name: 'Product 3', id: 3 },
  ];

  return (
    <div className="container p-5">
      {/* next */}
      <div className="row">
        {links.map((link) => (
          <div key={link.id} className="col text-center">
            <Link className="m-2 text-decoration-none text-dark" to={`/products/${link.id}`}>
              {link.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
