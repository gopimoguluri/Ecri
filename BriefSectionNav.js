import React from 'react';
import { Link } from 'react-router-dom';
import MarkdownRenderer from '../../MarkdownRenderer';
import styles from '../brief.module.scss';

const SectionNav = (props) => {

  const { onClickTabItem, prevLink, nextLink } = props;
  return (
    <div className={styles.sectionNav}>
      {prevLink && <a className={styles.previousSectionLink} href={`#${prevLink}`} onClick={(event) => onClickTabItem(prevLink)} aria-label="Previous Section"><i className={`${styles.arrowIcon} fas fa-arrow-left`} />Previous Section</a>}
      {nextLink && <a className={styles.nextSectionLink} href={`#${nextLink}`} onClick={(event) => onClickTabItem(nextLink)} aria-label="Previous Section">Next Section<i className={`${styles.arrowIcon} fas fa-arrow-right`} /></a>}
    </div>
  );
}


export default SectionNav;
