import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import classNames from 'classnames/bind';
import Sticker from 'react-sticky-fill';
import LoadingSpinner from '../LoadingSpinner';
import Breadcrumbs from '../Breadcrumbs';
import BriefSidebar from './BriefSidebar';
import TrustScoreCard from '../TrustScoreCard';
import trustSealInvertedIcon from '../../assets/images/trust-seal-no-label-invert.svg';
import HeaderPrintOnly from '../HeaderPrintOnly';
import SectionOverview from './SectionOverview';
import SectionRecommendations from './SectionRecommendations';
import SectionMethods from './SectionMethods';
import SectionRelatedContent from './SectionRelatedContent';
import SectionDisclaimer from './SectionDisclaimer';
import { fetchBrief } from '../../actions/briefs';
import { actionCreators } from '../../actions/usagelogging';
import MarkdownRenderer from '../MarkdownRenderer';
import styles from './brief.module.scss';

const rAF = window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : callback => setTimeout(callback, 16);
const cn = classNames.bind(styles);

const StickyContainer = ({ children }) => (
  <div className={styles.stickyContainer}>{children}</div>
);

const StickyBoundary = ({ children }) => (
  <div className={styles.stickyBoundary}>{children}</div>
);

const StickyBox = props => {
  const { mode, cssPositionSticky, children } = props;
  return (
    <div className={cn(['stickyBox'], mode, { isSticky: props.isSticky })}>
      {children}
    </div>
  );
};

const BriefDetails = props => {
  const {
    activeTab,
    activeTabSection,
    onClickTabItem,
    breadcrumbs,
    uniqueId,
    guidelineTitle,
    guidelineTopic,
    organizations,
    source,
    publicationReaffirmationDate,
    accessTheGuideline,
    patientPopulation,
    recommendations,
    evidenceRatingScheme,
    recommendationRatingScheme,
    benefits,
    risks,
    methodology,
    guidelineFunder,
    guidelineDevelopmentGroup,
    coi,
    supportingDocuments,
    implementationTools,
    patientEducation,
    printHandler,
    mode,
    deviceMediumMinWidthInPixels,
    onResize,
    // onScroll,
    setState,
    cssPositionSticky,
    isSticky,
  } = props;

  return (
    <React.Fragment>
      <Helmet
        title={`ECRI Guidelines Trust - ${guidelineTitle}`}
        metaContent="ECRI Guidelines Trust"
      />
      <HeaderPrintOnly pageTitle="brief" />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={styles.guidelineTitleContainer}>
        <h2 className={styles.guidelineTitle}>Guideline Brief</h2>
      </div>
      <div className={styles.brief} data-id={uniqueId}>
        <div className={styles.briefHeader}>
          <h1 className={styles.briefTitle}>{guidelineTitle}</h1>
          <div className={styles.briefMeta}>
            <span className={styles.briefGuid}>Guideline ID: {uniqueId}</span>
            <span className={styles.briefPubDate}>
              {publicationReaffirmationDate}
            </span>
          </div>
          <ul className={styles.briefDeveloper}>
            {organizations != ''
              ? organizations.map((org, i) => (
                  <li key={org.id}>
                    {org.title}
                    {organizations.length > 1 &&
                    organizations.length !== i + 1 ? (
                      <span className={styles.divider}>&#124;</span>
                    ) : (
                      ''
                    )}
                  </li>
                ))
              : ''}
          </ul>
          <span className={styles.briefBiblioSources}>
            <MarkdownRenderer source={source} />
          </span>
          <div className="row middle-md">
            <div className="col-xs-12 col-md-7">
              <ul className={styles.nav}>
                <li className={`${styles.navItem} hideForPrint`}>
                  <a
                    className={styles.navLink}
                    href="JavaScript:void(0);"
                    onClick={printHandler}
                    title="Print"
                  >
                    <i className="fa fa-print" />
                    Print
                  </a>
                </li>
                <li className={styles.navItem}>
                  <a
                    className={styles.navLink}
                    href={accessTheGuideline}
                    target="_blank"
                    title="View Original Guideline"
                  >
                    <i className="fa fa-external-link-square-alt" />
                    View Original Guideline
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-xs-12 col-md-5 end-md">
              <Link
                className={`${styles.scoreCardButton} button`}
                to={{
                  pathname: `/brief/trustscore/${uniqueId}/`,
                  state:
                    breadcrumbs && breadcrumbs.length > 0 ? breadcrumbs[0] : {},
                }}
                title="TRUST Scorecard"
                aria-label="TRUST Scorecard"
              >
                <img
                  className={styles.trustSealInvertedIcon}
                  src={trustSealInvertedIcon}
                />
                <span className={styles.scoreCardLabel} title="TRUST Scorecard">
                  TRUST Scorecard
                </span>
              </Link>
            </div>
          </div>
        </div>
        <StickyContainer>
          <div className="row">
            <div className="col-xs-12 col-md-4 col-lg-3">
              <Sticker>
                <StickyBox
                  mode={mode}
                  cssPositionSticky={cssPositionSticky}
                  isSticky={isSticky}
                >
                  <BriefSidebar
                    activeTab={activeTab}
                    onClickTabItem={onClickTabItem}
                  />
                </StickyBox>
              </Sticker>
            </div>
            <div className="col-xs-12 col-md-8 col-lg-9">
              <StickyBoundary key="boundary">
                <div className={styles.briefBody}>
                  <SectionOverview
                    activeTabSection={activeTabSection}
                    guidelineTopic={guidelineTopic}
                    patientPopulation={patientPopulation}
                    onClickTabItem={onClickTabItem}
                  />
                  <SectionRecommendations
                    activeTabSection={activeTabSection}
                    recommendations={recommendations}
                    evidenceRatingScheme={evidenceRatingScheme}
                    recommendationRatingScheme={recommendationRatingScheme}
                    benefits={benefits}
                    risks={risks}
                    onClickTabItem={onClickTabItem}
                  />
                  <SectionMethods
                    activeTabSection={activeTabSection}
                    methodology={methodology}
                    guidelineFunder={guidelineFunder}
                    guidelineDevelopmentGroup={guidelineDevelopmentGroup}
                    coi={coi}
                    onClickTabItem={onClickTabItem}
                  />
                  <SectionRelatedContent
                    activeTabSection={activeTabSection}
                    supportingDocuments={supportingDocuments}
                    implementationTools={implementationTools}
                    patientEducation={patientEducation}
                    onClickTabItem={onClickTabItem}
                  />
                  <SectionDisclaimer
                    activeTabSection={activeTabSection}
                    onClickTabItem={onClickTabItem}
                  />
                  <div className={`${styles.showForPrint} ${styles.pageBreak}`}>
                    <div className={styles.guidelineTitleContainer}>
                      <h2 className={styles.guidelineTitle}>TRUST Scorecard</h2>
                    </div>
                    <TrustScoreCard {...props} />
                  </div>
                </div>
              </StickyBoundary>
            </div>
          </div>
        </StickyContainer>
      </div>
    </React.Fragment>
  );
};

class Brief extends React.Component {
  constructor(props) {
    super(props);
    const { history } = this.props;
    this.state = {
      mode: styles.isTop,
      deviceMediumMinWidthInPixels: 768,
      activeTab: 'overview',
      activeTabSection: 'sectionOverview',
    };
    this.printBrief = this.printBrief.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onClickTabItem = this.onClickTabItem.bind(this);
  }

  componentDidMount() {
    const { user, match, briefs = {}, dispatch, previewMode } = this.props;
    const { isLoadingCurrent: isLoading = false, current = null } = briefs;
    const neverLoaded = !isLoading && !current;
    const updated =
      !isLoading && current && current.uniqueId !== match.params.uniqueid;
    if (neverLoaded || updated) {
      dispatch(
        fetchBrief(
          user.access_token,
          match.params.uniqueid,
          previewMode.isEnabled
        )
      );
    }
    setTimeout(
      /* wait until this.stickyBox is available, wait next browser DOM update tick, maybe this is not needed but I want to be sure it works, seemed quirky without when tested */
      () =>
        this.setState({ stickyBoxEl: ReactDOM.findDOMNode(this.stickyBox) }),
      0
    );

    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.onScroll);
  }

  componentDidUpdate(prevProps) {
    const { dispatch, user, previewMode, briefs, match } = this.props;
    const wasInPreview =
      prevProps.previewMode && prevProps.previewMode.isEnabled;
    const usePreview = previewMode && previewMode.isEnabled;

    if (wasInPreview !== usePreview && briefs) {
      dispatch(
        fetchBrief(user.access_token, match.params.uniqueid, usePreview)
      );
    }
    const { isLoadingCurrent: isLoading = false, current = null } = briefs;
    const updated =
      !isLoading && current && `${current.uniqueId}` !== match.params.uniqueid;
    if (updated) {
      dispatch(
        fetchBrief(
          user.access_token,
          match.params.uniqueid,
          previewMode.isEnabled
        )
      );
      this.setState({
        activeTabSection: 'sectionOverview',
        activeTab: 'overview',
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
  }

  onClickTabItem(activeTab) {
    let activeTabSection;
    switch (activeTab) {
      case 'overview':
      case 'guidelineTopic':
      case 'patientPopulation':
        activeTabSection = 'sectionOverview';
        break;
      case 'recommendations':
      case 'recommendationStatements':
      case 'evidenceRatingScheme':
      case 'recommendationRatingScheme':
      case 'benefits':
      case 'risks':
        activeTabSection = 'sectionRecommendations';
        break;
      case 'methods':
      case 'methodology':
      case 'guidelineFunder':
      case 'guidelineDevelopmentGroup':
      case 'conflictsOfInterest':
        activeTabSection = 'sectionMethods';
        break;
      case 'relatedContent':
      case 'supportingDocuments':
      case 'implementationTools':
      case 'patientEducation':
        activeTabSection = 'sectionRelatedContent';
        break;
      case 'disclaimer':
        activeTabSection = 'sectionDisclaimer';
        break;
    }
    this.setState({ activeTab, activeTabSection });
    console.log('activeTab clicked: ', activeTab);
  }

  onResize() {
    rAF(() => {
      /* throttle events */

      this.setState({
        mode: this._getStickyModeByClientWidth(),
        isSticky: false,
      });

      setTimeout(
        /* wait next tick, because the DOM might change, sticky moved from top to bottom or vice versa, maybe not needed but seemed quirky when tested */
        () =>
          this.setState({ stickyBoxEl: ReactDOM.findDOMNode(this.stickyBox) }),
        0
      );
    });
  }

  _getStickyModeByClientWidth() {
    return document.documentElement.clientWidth >=
      this.state.deviceMediumMinWidthInPixels
      ? 'isTop'
      : 'isBottom';
  }

  printBrief(e) {
    e.preventDefault();
    window.print();
    const { dispatch, user, match } = this.props;
    dispatch(actionCreators.printedBrief(user, match.url));
  }

  featureDetectCssPositionSticky() {
    const el = document.createElement('div');
    // Could also use inline style, but I am using autoprefixer to generate the vendor prefixes for me.
    // el.style.cssText = 'position: -webkit-sticky; position: sticky;';
    el.className = 'u-feature-detect-sticky';

    document.body.appendChild(el);
    const position = window.getComputedStyle(el).position;
    document.body.removeChild(el);
    if (position === 'absolute' || position === 'static') {
      return null;
    }
    return position || null;
  }

  getViewHeight() {
    return Math.max(window.innerHeight, 0);
  }

  getScrollPosition() {
    return (
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      0
    );
  }

  isInRange(value, min, max) {
    return value >= min && value <= max;
  }

  render() {
    const {
      mode,
      deviceMediumMinWidthInPixels,
      activeTabSection,
      activeTab,
    } = this.state;
    const { breadcrumbs, briefs } = this.props;
    const { current = null, isLoadingCurrent: isLoading = false } =
      briefs || {};
    return (
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="brief">
                {!isLoading && current ? (
                  <div>
                    <BriefDetails
                      {...current}
                      activeTabSection={activeTabSection}
                      activeTab={activeTab}
                      breadcrumbs={breadcrumbs}
                      mode={mode}
                      deviceMediumMinWidthInPixels={
                        deviceMediumMinWidthInPixels
                      }
                      printHandler={this.printBrief}
                      onResize={this.onResize}
                      onScroll={this.onScroll}
                      onClickTabItem={this.onClickTabItem}
                      setState={p => {
                        this.setState(p);
                      }}
                      cssPositionSticky={this.state.cssPositionSticky}
                      isSticky={this.state.isSticky}
                    />
                  </div>
                ) : (
                  isLoading && <LoadingSpinner />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.oidc.user,
  previewMode: state.previewMode,
  briefs: state.briefs,
  breadcrumbs: state.breadCrumbs.crumbs,
});

export default withRouter(connect(mapStateToProps)(Brief));
