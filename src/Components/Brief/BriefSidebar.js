import React from 'react';
import { Link } from 'react-router-dom';
import styles from './briefSidebar.module.scss';

const BriefSidebar = (props) => {
  return (
    <div className={styles.sidebarNav}>
      <div className={styles.sidebarNavContent}>
        <ul className={styles.sidebarNavList}>
          <li className={`${styles.sidebarNavItem} ${styles.navItemHeading}`}>
            <a className={`${styles.sidebarNavLink} ${props.activeTab === 'overview' && styles.active}`} href="JavaScript:void(0);" onClick={() => props.onClickTabItem('overview')} aria-label="Overview">Overview</a>
          </li>
          <li className={styles.sidebarNavItem}>
            <a className={`${styles.sidebarNavLink} ${props.activeTab === 'guidelineTopic' && styles.active}`} href="JavaScript:void(0);" onClick={() => props.onClickTabItem('guidelineTopic')} aria-label="Guideline Topic">Guideline Topic</a>
          </li>
          <li className={styles.sidebarNavItem}>
            <a className={`${styles.sidebarNavLink} ${props.activeTab === 'patientPopulation' && styles.active}`} href="JavaScript:void(0);" onClick={() => props.onClickTabItem('patientPopulation')} aria-label="Patient Population">Patient Population</a>
          </li>
          <li className={`${styles.sidebarNavItem} ${styles.navItemHeading}`}>
            <a className={`${styles.sidebarNavLink} ${props.activeTab === 'recommendations' && styles.active}`} href="#recommendations" onClick={() => props.onClickTabItem('recommendations')} aria-label="Recommendations">Recommendations</a>
          </li>
          <li className={styles.sidebarNavItem}>
            <a className={`${styles.sidebarNavLink} ${props.activeTab === 'recommendationStatements' && styles.active}`} href="#recommendationStatements" onClick={() => props.onClickTabItem('recommendationStatements')} aria-label="Recommendation Statements">Recommendation Statements</a>
          </li>
          <li className={styles.sidebarNavItem}>
            <a className={`${styles.sidebarNavLink} ${props.activeTab === 'evidenceRatingScheme' && styles.active}`} href="#evidenceRatingScheme" onClick={() => props.onClickTabItem('evidenceRatingScheme')} aria-label="Evidence Rating Scheme">Evidence Rating Scheme</a>
          </li>
          <li className={styles.sidebarNavItem}>
            <a className={`${styles.sidebarNavLink} ${props.activeTab === 'recommendationRatingScheme' && styles.active}`} href="#recommendationRatingScheme" onClick={() => props.onClickTabItem('recommendationRatingScheme')} aria-label="Recommendation Rating Scheme">Recommendation Rating Scheme</a>
          </li>
          <li className={styles.sidebarNavItem}>
            <a className={`${styles.sidebarNavLink} ${props.activeTab === 'benefits' && styles.active}`} href="#benefits" onClick={() => props.onClickTabItem('benefits')} aria-label="Benefits">Benefits</a>
          </li>
          <li className={styles.sidebarNavItem}>
            <a className={`${styles.sidebarNavLink} ${props.activeTab === 'risks' && styles.active}`} href="#risks" onClick={() => props.onClickTabItem('risks')} aria-label="Risks">Risks</a>
          </li>
          <li className={`${styles.sidebarNavItem} ${styles.navItemHeading}`}>
            <a className={`${styles.sidebarNavLink} ${props.activeTab === 'methods' && styles.active}`} href="#methods" onClick={() => props.onClickTabItem('methods')} aria-label="Methods">Methods</a>
          </li>
          <li className={styles.sidebarNavItem}>
            <a className={`${styles.sidebarNavLink} ${props.activeTab === 'methodology' && styles.active}`} href="#methodology" onClick={() => props.onClickTabItem('methodology')} aria-label="Methodology">Methodology</a>
          </li>
          <li className={styles.sidebarNavItem}>
            <a className={`${styles.sidebarNavLink} ${props.activeTab === 'guidelineFunder' && styles.active}`} href="#guidelineFunder" onClick={() => props.onClickTabItem('guidelineFunder')} aria-label="Guideline Funder">Guideline Funder</a>
          </li>
          <li className={styles.sidebarNavItem}>
            <a className={`${styles.sidebarNavLink} ${props.activeTab === 'guidelineDevelopmentGroup' && styles.active}`} href="#guidelineDevelopmentGroup" onClick={() => props.onClickTabItem('guidelineDevelopmentGroup')} aria-label="Guideline Development Group">Guideline Development Group</a>
          </li>
          <li className={styles.sidebarNavItem}>
            <a className={`${styles.sidebarNavLink} ${props.activeTab === 'conflictsOfInterest' && styles.active}`} href="#conflictsOfInterest" onClick={() => props.onClickTabItem('conflictsOfInterest')} aria-label="Conflicts of Interest (COI)">Conflicts of Interest (COIs)</a>
          </li>
          <li className={`${styles.sidebarNavItem} ${styles.navItemHeading}`}>
            <a className={`${styles.sidebarNavLink} ${props.activeTab === 'relatedContent' && styles.active}`} href="#relatedContent" onClick={() => props.onClickTabItem('relatedContent')} aria-label="Related Content">Related Content</a>
          </li>
          <li className={styles.sidebarNavItem}>
            <a className={`${styles.sidebarNavLink} ${props.activeTab === 'supportingDocuments' && styles.active}`} href="#supportingDocuments" onClick={() => props.onClickTabItem('supportingDocuments')} aria-label="Supporting Documents">Supporting Documents</a>
          </li>
          <li className={styles.sidebarNavItem}>
            <a className={`${styles.sidebarNavLink} ${props.activeTab === 'implementationTools' && styles.active}`} href="#implementationTools" onClick={() => props.onClickTabItem('implementationTools')} aria-label="Implementation Tools">Implementation Tools</a>
          </li>
          <li className={styles.sidebarNavItem}>
            <a className={`${styles.sidebarNavLink} ${props.activeTab === 'patientEducation' && styles.active}`} href="#patientEducation" onClick={() => props.onClickTabItem('patientEducation')} aria-label="Patient Education">Patient Education</a>
          </li>
          <li className={`${styles.sidebarNavItem} ${styles.navItemHeading}`}>
            <a className={`${styles.sidebarNavLink} ${props.activeTab === 'disclaimer' && styles.active}`} href="#disclaimer" onClick={() => props.onClickTabItem('disclaimer')} aria-label="Copyright/Disclaimer">Copyright/Disclaimer</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BriefSidebar;
