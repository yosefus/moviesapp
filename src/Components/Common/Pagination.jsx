import _ from 'lodash';

import propTypes from 'prop-types';

function Pagination({ onPageChange, pageSize, moviesLength, currentPage }) {
  const pagesCount = Math.ceil(moviesLength / pageSize);

  const pagesArr = _.range(1, pagesCount + 1);

  return (
    <>
      {pagesCount !== 1 && (
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {pagesArr.map((page) => (
              <li key={page} className={`page-item ${page === currentPage && 'active'}`}>
                <p style={{ cursor: 'pointer' }} className="page-link" onClick={() => onPageChange(page)}>
                  {page}
                </p>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}

Pagination.propTypes = {
  pageSize: propTypes.number.isRequired,
  moviesLength: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
};

export default Pagination;
