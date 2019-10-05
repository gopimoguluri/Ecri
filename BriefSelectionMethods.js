import React from 'react';
import MarkdownRenderer from '../../MarkdownRenderer';
import SectionNav from '../SectionNav';
import styles from '../brief.module.scss';

const SectionMethods = (props) => {
  const { onClickTabItem, activeTabSection, methodology, guidelineFunder, guidelineDevelopmentGroup, coi, } = props;
  return (
    <div
      id="sectionMethods"
      className={`${styles.briefSection} ${activeTabSection == 'sectionMethods'
        && styles.active}`}
    >
      <h2 className={styles.briefSectionTitle}>
        <a id="methods" className={styles.link} href="JavaScript:void(0);" name="methods" aria-label="Methods">
          Methods
        </a>
      </h2>
      <h4 className={styles.briefSectionSubtitle}>
        <a id="methodology" className={styles.link} href="JavaScript:void(0);" name="methodology" aria-label="Methodology">
          Methodology
        </a>
      </h4>
      <MarkdownRenderer source={methodology} />

      <h4 className={styles.briefSectionSubtitle}>
        <a id="guidelineFunder" className={styles.link} href="JavaScript:void(0);" name="guidelineFunder" aria-label="Guideline Funder">
          Guideline Funder
        </a>
      </h4>
      <MarkdownRenderer source={guidelineFunder} />

      <h4 className={styles.briefSectionSubtitle}>
        <a
          id="guidelineDevelopmentGroup"
          className={styles.link}
          href="JavaScript:void(0);"
          name="guidelineDevelopmentGroup"
        >
          Guideline Development Group
        </a>
      </h4>
      <MarkdownRenderer source={guidelineDevelopmentGroup} />

      <h4 className={styles.briefSectionSubtitle}>
        <a
          id="conflictsOfInterest"
          className={styles.link}
          href="JavaScript:void(0);"
          name="conflictsOfInterest"
        >
          Conflicts of Interest (COIs)
        </a>
      </h4>
      <MarkdownRenderer source={coi} />
      <SectionNav onClickTabItem={onClickTabItem} prevLink="recommendations" nextLink="relatedContent" />
    </div>
  );

}


export default SectionMethods;
