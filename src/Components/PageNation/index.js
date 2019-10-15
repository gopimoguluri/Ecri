import React from 'react';
import PropTypes from 'prop-types';
import styles from './pagination.module.scss';

const getPageRequest = (totalItems, currentPage = 1, pageSize = 5) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  let startPage;
  let endPage;
  if (totalPages <= 5) {
    startPage = 1;
    endPage = totalPages;
    // Last page before numbers start shifting
  } else if (currentPage <= 3) {
    startPage = 1;
    endPage = 5;
    // This is when numbers shift to the end
  } else if (currentPage + 2 >= totalPages) {
    startPage = totalPages - 2;
    endPage = totalPages;
    // This is when numbers shift in general
  } else {
    startPage = currentPage - 2;
    endPage = currentPage + 2;
  }

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
  const pages = [...Array(endPage + 1 - startPage).keys()].map(i => startPage + i);

  return {
    totalItems,
    currentPage,
    pageSize,
    totalPages,
    startPage,
    endPage,
    startIndex,
    endIndex,
    pages,
  };
};
class Pagination extends React.Component {
  getPage = (e, page) => {
    e.stopPropagation();
    e.preventDefault();
    const { totalItems, onChangePage, pageSize } = this.props;

    onChangePage(getPageRequest(totalItems, page, pageSize));
  };

  render() {
    const { totalItems, currentPage, pageSize } = this.props;
    const { totalPages, pages } = getPageRequest(totalItems, currentPage, pageSize);

    if (!pages || pages.length <= 1) {
      return null;
    }

    return (
      <div className={`${styles.paginationContainer} row middle-xs`}>
        <div className={`${styles.leftCol} col-xs-3 start-xs`}>
          <a
            className={`${styles.previousLink} ${currentPage === 1 && styles.disabled}`}
            href="JavaScript:void(0);"
            onClick={e => this.getPage(e, Math.max(1, currentPage - 1))}
          >
            <i className="fas fa-arrow-circle-left" />
            <span className={styles.text}>Previous</span>
          </a>
        </div>
        <div className={`${styles.middleCol} col-xs-6 center-xs`}>
          <ul className={styles.pageNumbersList}>
            <li className={`${styles.pageNumbersItem} ${currentPage <= 3 && styles.hide}`}>
              <a
                className={`${styles.pageNumberLink}`}
                href="JavaScript:void(0);"
                onClick={e => this.getPage(e, Math.max(1, currentPage - 1))}
              >
                ...
              </a>
            </li>

            {pages.map((page, index) => (
              <li key={index} className={`${styles.pageNumbersItem}`}>
                <a
                  className={`${styles.pageNumberLink} ${currentPage === page && styles.active}`}
                  href="JavaScript:void(0);"
                  onClick={e => this.getPage(e, page)}
                >
                  {page}
                </a>
              </li>
            ))}

            <li
              className={`${styles.pageNumbersItem} ${currentPage >= totalPages - 2
                && styles.hide}`}
            >
              <a
                className={`${styles.pageNumberLink}`}
                href="JavaScript:void(0);"
                onClick={e => this.getPage(e, Math.min(totalPages, currentPage + 1))}
              >
                ...
              </a>
            </li>
          </ul>
        </div>
        <div className={`${styles.rightCol} col-xs-3 end-xs`}>
          <a
            className={`${styles.nextLink} ${currentPage === totalPages && styles.disabled}`}
            href="JavaScript:void(0);"
            onClick={e => this.getPage(e, Math.min(totalPages, currentPage + 1))}
          >
            <span className={styles.text}>Next</span>
            <i className="fas fa-arrow-circle-right" />
          </a>
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};
export default Pagination;
