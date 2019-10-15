import React from 'react';
import ecriLogo from '../../assets/logo-ecri-standard.svg';
import ecriGuidelinesLogo from '../../assets/logo-ecri-guidelines-trust.svg';
import logoEcriGuidelinesTrustImg from '../../assets/logo-long-ecri-institute-guidelines-trust.svg';
import trustScorecardHeadingImg from '../../assets/heading-trust-scorecard.svg';
import guidelineBriefHeadingImg from '../../assets/heading-guideline-brief.svg';
import styles from './headerPrintOnly.module.scss';

const HeaderPrintOnly = (props) => {
  return (
    <div className={styles.printOnlyHeader}>
      <div className="row between-xs between-md bottom-xs bottom-md bottom-lg">
        <div className="col-xs-6 col-md-8">
          <img className={styles.ecriLogo} src={logoEcriGuidelinesTrustImg} alt="ECRI Institute | Guidelines Trust"/>
        </div>
        <div className="col-xs-6 col-md-4">
          {/*<img className={styles.guidelinesTrustLogo} src={guidelinesTrustHeadingImg} alt="Guidelines Trust"/>*/}
        </div>
      </div>
      <h2 className={styles.printOnlyTitle}>{props.pageTitle === 'brief' && ''/*<img src={guidelineBriefHeadingImg} alt="Guideline Brief" />*/} {props.pageTitle === 'scorecard' && ''/*<img className={styles.scorecard} src={trustScorecardHeadingImg} alt="Transparency and Rigor Using Standards of Trustworthiness (TRUST) Scorecard"/>*/}</h2>
  </div>     
  );
}

export default HeaderPrintOnly;
