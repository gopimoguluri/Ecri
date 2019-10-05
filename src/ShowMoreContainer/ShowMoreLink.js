import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import styles from './showmorelink.module.scss';

const ShowMoreLink = ({
  onClick, text, arrowPosition, className,
}) => (
  <div className={className} onClick={() => onClick()}>
    <div className={styles.showMoreLink}>
      {arrowPosition === 'left' && (
        <FontAwesomeIcon icon={faArrowLeft} className={styles.showMoreLinkButtonLeft} />
      )}
      <button className={styles.showMoreLinkButton}>{text}</button>
      {arrowPosition === 'right' && (
        <FontAwesomeIcon className={styles.showMoreLinkButtonRight} icon={faArrowRight} />
      )}
    </div>
  </div>
);

ShowMoreLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  arrowPosition: PropTypes.oneOf(['left', 'right']).isRequired,
  className: PropTypes.string,
};

ShowMoreLink.defaultProps = {
  className: '',
};

export default ShowMoreLink;
