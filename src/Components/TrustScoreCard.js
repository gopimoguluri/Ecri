import React from 'react';
import ReactTooltip from 'react-tooltip';
import StarRating from '../StarRating';
import trustSealIconWithLabel from '../../assets/images/trust-seal-with-label.svg';
import styles from './trustScoreCard.module.scss';

const TrustScoreCard = props => (
  <div className={styles.trustScore}>
    {/*
    <div className={styles.trustScoreHeader}>
      <a className={`${styles.button} hideForPrint button`} href="JavaScript:void(0);" aria-label="LEARN MORE ABOUT ECRI'S TRUST Scorecard">
        <i className="fa fa-star">&nbsp;</i>
        <span className={styles.scoreCardLabel}>LEARN MORE ABOUT ECRI'S TRUST Scorecard</span>
      </a>
    </div>
    */}
    <div className={`${styles.scoreCard} row`}>
      <div className="col-xs-12 col-md-6">
        <div className={styles.scoreCardSection} data-tip data-for="cogdg">
          <h3 className={styles.scoreCardHeading}>
            Composition of Guideline Development Group (GDG)
          </h3>
          <div className={styles.ratingList}>
            <div className={styles.ratingListItem} data-tip data-for="mdGDMm">
              <div className={styles.ratingListScore}>
                <span className={styles.ratingYesNo}>
                  {props.assessment.devGrpCompositionMultidisciplinaryGroup}
                </span>
              </div>
              <div className={styles.ratingListDesc}>Multidisciplinary GDG Members</div>
              <ReactTooltip type="info" className={styles.tooltip} id="mdGDMm" multiline>
                <div>
                  <br />
                  Assesses whether the GDG included individuals from a<br />
                  variety of relevant clinical specialties and other professional groups.
                  <br />
                  <br />
                </div>
              </ReactTooltip>
            </div>
            <div className={styles.ratingListItem} data-tip data-for="mi">
              <div className={styles.ratingListScore}>
                <span className={styles.ratingYesNo}>
                  {props.assessment.devGrpCompositionMethodologistInvolvement}
                </span>
              </div>
              <div className={styles.ratingListDesc}>Methodologist Involvement</div>
              <ReactTooltip type="info" className={styles.tooltip} id="mi" multiline>
                <div>
                  <br />
                  Assesses whether the GDG stated that it included a<br />
                  methodological expert and identified the methodologist.
                  <br />
                  <br />
                </div>
              </ReactTooltip>
            </div>
            <div className={styles.ratingListItem} data-tip data-for="ippp">
              <div className={styles.ratingListScore}>
                <StarRating rating={props.assessment.devGrpCompositionPatientPublicPerspectives} />
              </div>
              <div className={styles.ratingListDesc}>
                Incorporation of Patient and Public Perspectives
              </div>
              <ReactTooltip type="info" className={styles.tooltip} id="ippp" multiline>
                <div>
                  <br />
                  Assesses the extent to which the GDG sought and incorporated the views,
                  <br />
                  perspectives, and preferences of patients, patient surrogates, patient advocates,
                  <br />
                  and/or the public intended to represent those who have experience with the
                  disease,
                  <br />
                  its treatments, or complications, or those who could be affected by the guideline.
                  <br />
                  <br />
                </div>
              </ReactTooltip>
            </div>
          </div>
        </div>
        <div
          className={`${styles.scoreCardSection} ${styles.showForMobile} ${styles.reviewEvidence}`}
        >
          <h3 className={styles.scoreCardHeading}>Systematic Review of Evidence</h3>
          <div>
            <div className={styles.ratingListItem} data-tip data-for="ls">
              <div className={styles.ratingListScore}>
                <StarRating rating={props.assessment.sreSearchStrategy} />
              </div>
              <div className={styles.ratingListDesc}>Literature Search</div>
              <ReactTooltip type="info" className={styles.tooltip} id="ls" multiline>
                <div>
                  <br />
                  Assesses the extent to which the guideline described a search strategy <br />
                  including databases searched, search terms, and specific time periods covered.
                  <br />
                  <br />
                </div>
              </ReactTooltip>
            </div>
            <div className={styles.ratingListItem} data-tip data-for="ss">
              <div className={styles.ratingListScore}>
                <StarRating rating={props.assessment.sreStudySelection} />
              </div>
              <div className={styles.ratingListDesc}>Study Selection</div>
              <ReactTooltip type="info" className={styles.tooltip} id="ss" multiline>
                <div>
                  <br />
                  Assesses the extent to which the guideline described a study selection that
                  <br /> described the number of studies identified and included, and a summary of
                  inclusion and
                  <br /> exclusion criteria. <br />
                  <br />
                  <br />
                </div>
              </ReactTooltip>
            </div>
            <div className={styles.ratingListItem} data-tip data-for="es">
              <div className={styles.ratingListScore}>
                <StarRating rating={props.assessment.sreSynthesisOfEviden} />
              </div>
              <div className={styles.ratingListDesc}>Evidence Synthesis</div>
              <ReactTooltip type="info" className={styles.tooltip} id="es" multiline>
                <div>
                  <br />
                  Assesses the extent to which the guideline provided a synthesis of evidence
                  <br />
                  from the selected studies (i.e., an analysis of individual studies and the body of
                  <br />
                  evidence) in the form of a detailed description or evidence tables, or both.
                  <br />
                  <br />
                </div>
              </ReactTooltip>
            </div>
          </div>
        </div>
        <div
          className={`${styles.scoreCardSection} ${styles.hideForMobile} ${
            styles.foundationRecommendations
          }`}
        >
          <h3 className={styles.scoreCardHeading}>Foundations for Recommendations</h3>
          <div className={styles.ratingList}>
            <div className={styles.ratingListItem} data-tip data-for="soeg">
              <div className={styles.ratingListScore}>
                <StarRating rating={props.assessment.efGradingTheQualityOrStrengthOfEvidence} />
              </div>
              <div className={styles.ratingListDesc}>Strength of Evidence Grade</div>
              <ReactTooltip type="info" className={styles.tooltip} id="soeg" multiline>
                <div>
                  <br />
                  Assesses the extent to which the guideline provided
                  <br />a grading of the level of confidence in, or certainty regarding,
                  <br />
                  the quality or strength of the evidence for each recommendation.
                  <br />
                  <br />
                </div>
              </ReactTooltip>
            </div>
            <div className={styles.ratingListItem} data-tip data-for="dobahor">
              <div className={styles.ratingListScore}>
                <StarRating rating={props.assessment.efBenefitsAndHarmsOfRecommendations} />
              </div>
              <div className={styles.ratingListDesc}>
                Description of Benefits and Harms of Recommendations
              </div>
              <ReactTooltip type="info" className={styles.tooltip} id="dobahor" multiline>
                <div>
                  <br />
                  Assesses the extent to which the potential benefits
                  <br />
                  and harms of recommended care are clearly described for
                  <br />
                  the guideline’s recommendations.
                  <br />
                  <br />
                </div>
              </ReactTooltip>
            </div>
            <div className={styles.ratingListItem} data-tip data-for="soesr">
              <div className={styles.ratingListScore}>
                <StarRating rating={props.assessment.efEvidenceSummarySupportingRecommendations} />
              </div>
              <div className={styles.ratingListDesc}>
                Summary of Evidence Supporting Recommendations
              </div>
              <ReactTooltip type="info" className={styles.tooltip} id="soesr" multiline>
                <div>
                  <br />
                  Assesses the extent to which a summary of
                  <br />
                  the relevant supporting evidence is explicitly
                  <br />
                  linked to the guideline’s recommendations.
                  <br />
                  <br />
                </div>
              </ReactTooltip>
            </div>
            <div className={styles.ratingListItem} data-tip data-for="sors">
              <div className={styles.ratingListScore}>
                <StarRating rating={props.assessment.efRatingTheStrengthOfRecommendations} />
              </div>
              <div className={styles.ratingListDesc}> Strength of Recommendations Rating</div>
              <ReactTooltip type="info" className={styles.tooltip} id="sors" multiline>
                <div>
                  <br />
                  Assesses the extent to which the guideline provided a<br />
                  rating of the strength of the recommendation for each recommendation.
                  <br />
                  <br />
                </div>
              </ReactTooltip>
            </div>
            <div className={styles.ratingListItem} data-tip data-for="caor">
              <div className={styles.ratingListScore}>
                <StarRating rating={props.assessment.specificUnambiguousArticulationOfRecommend} />
              </div>
              <div className={styles.ratingListDesc}> Clear Articulation of Recommendations</div>
              <ReactTooltip type="info" className={styles.tooltip} id="caor" multiline>
                <div>
                  <br />
                  Assesses the extent to which the guideline’s
                  <br /> recommendations are specific and unambiguous.
                  <br />
                  <br />
                </div>
              </ReactTooltip>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xs-12 col-md-6">
        <div
          className={`${styles.scoreCardSection} ${styles.showForMobile} ${
            styles.foundationRecommendations
          }`}
        >
          <h3 className={styles.scoreCardHeading}>Foundations for Recommendations</h3>
          <div className={styles.ratingList}>
            <div className={styles.ratingListItem} data-tip data-for="soeg">
              <div className={styles.ratingListScore}>
                <StarRating rating={props.assessment.efGradingTheQualityOrStrengthOfEvidence} />
              </div>
              <div className={styles.ratingListDesc}>Strength of Evidence Grade</div>
              <ReactTooltip type="info" className={styles.tooltip} id="soeg" multiline>
                <div>
                  <br />
                  Assesses the extent to which the guideline provided
                  <br />a grading of the level of confidence in, or certainty regarding,
                  <br />
                  the quality or strength of the evidence for each recommendation.
                  <br />
                  <br />
                </div>
              </ReactTooltip>
            </div>
            <div className={styles.ratingListItem} data-tip data-for="dobahor">
              <div className={styles.ratingListScore}>
                <StarRating rating={props.assessment.efBenefitsAndHarmsOfRecommendations} />
              </div>
              <div className={styles.ratingListDesc}>
                Description of Benefits and Harms of Recommendations
              </div>
              <ReactTooltip type="info" className={styles.tooltip} id="dobahor" multiline>
                <div>
                  <br />
                  Assesses the extent to which the potential benefits
                  <br />
                  and harms of recommended care are clearly described for
                  <br />
                  the guideline’s recommendations.
                  <br />
                  <br />
                </div>
              </ReactTooltip>
            </div>
            <div className={styles.ratingListItem} data-tip data-for="soesr">
              <div className={styles.ratingListScore}>
                <StarRating rating={props.assessment.efEvidenceSummarySupportingRecommendations} />
              </div>
              <div className={styles.ratingListDesc}>
                Summary of Evidence Supporting Recommendations
              </div>
              <ReactTooltip type="info" className={styles.tooltip} id="soesr" multiline>
                <div>
                  <br />
                  Assesses the extent to which a summary of
                  <br />
                  the relevant supporting evidence is explicitly
                  <br />
                  linked to the guideline’s recommendations.
                  <br />
                  <br />
                </div>
              </ReactTooltip>
            </div>
            <div className={styles.ratingListItem} data-tip data-for="sors">
              <div className={styles.ratingListScore}>
                <StarRating rating={props.assessment.efRatingTheStrengthOfRecommendations} />
              </div>
              <div className={styles.ratingListDesc}> Strength of Recommendations Rating</div>
              <ReactTooltip type="info" className={styles.tooltip} id="sors" multiline>
                <div>
                  <br />
                  Assesses the extent to which the guideline provided a<br />
                  rating of the strength of the recommendation for each recommendation.
                  <br />
                  <br />
                </div>
              </ReactTooltip>
            </div>
            <div className={styles.ratingListItem} data-tip data-for="caor">
              <div className={styles.ratingListScore}>
                <StarRating rating={props.assessment.specificUnambiguousArticulationOfRecommend} />
              </div>
              <div className={styles.ratingListDesc}> Clear Articulation of Recommendations</div>
              <ReactTooltip type="info" className={styles.tooltip} id="caor" multiline>
                <div>
                  <br />
                  Assesses the extent to which the guideline’s
                  <br /> recommendations are specific and unambiguous.
                  <br />
                  <br />
                </div>
              </ReactTooltip>
            </div>
          </div>
        </div>

        <div
          className={`${styles.scoreCardSection} ${styles.hideForMobile} ${styles.reviewEvidence}`}
        >
          <h3 className={styles.scoreCardHeading}>Systematic Review of Evidence</h3>
          <div>
            <div className={styles.ratingListItem} data-tip data-for="ls">
              <div className={styles.ratingListScore}>
                <StarRating rating={props.assessment.sreSearchStrategy} />
              </div>
              <div className={styles.ratingListDesc}>Literature Search</div>
              <ReactTooltip type="info" className={styles.tooltip} id="ls" multiline>
                <div>
                  <br />
                  Assesses the extent to which the guideline described a<br />
                  search strategy including databases searched, search terms,
                  <br />
                  and specific time periods covered.
                  <br />
                  <br />
                </div>
              </ReactTooltip>
            </div>
            <div className={styles.ratingListItem} data-tip data-for="ss">
              <div className={styles.ratingListScore}>
                <StarRating rating={props.assessment.sreStudySelection} />
              </div>
              <div className={styles.ratingListDesc}>Study Selection</div>
              <ReactTooltip type="info" className={styles.tooltip} id="ss" multiline>
                <div>
                  <br />
                  Assesses the extent to which the guideline described a study
                  <br />
                  selection that described the number of studies identified and
                  <br />
                  included, and a summary of inclusion and exclusion criteria.
                  <br />
                  <br />
                </div>
              </ReactTooltip>
            </div>
            <div className={styles.ratingListItem} data-tip data-for="es">
              <div className={styles.ratingListScore}>
                <StarRating rating={props.assessment.sreSynthesisOfEviden} />
              </div>
              <div className={styles.ratingListDesc}>Evidence Synthesis</div>
              <ReactTooltip type="info" className={styles.tooltip} id="es" multiline>
                <div>
                  <br />
                  Assesses the extent to which the guideline provided a synthesis of evidence
                  <br />
                  from the selected studies (i.e., an analysis of individual studies and the body of
                  <br />
                  evidence) in the form of a detailed description or evidence tables, or both.
                  <br />
                  <br />
                </div>
              </ReactTooltip>
            </div>
          </div>
        </div>
        <div className={styles.scoreCardSection} data-tip data-for="fsd">
          <div className={styles.ratingList}>
            <div className={styles.ratingListItem}>
              <div className={styles.ratingListScore}>
                <span className={styles.ratingYesNo}>
                  {props.assessment.disclosureOfGuidelineFundingSource}
                </span>
              </div>
              <div className={styles.ratingListDesc}>
                <h3 className={styles.scoreCardHeading}>Funding Source Disclosure</h3>
              </div>
            </div>
          </div>
          <ReactTooltip type="info" className={styles.tooltip} id="fsd" multiline>
            <div>
              Assesses whether the guideline disclosed and stated explicitly its funding source.
            </div>
          </ReactTooltip>
        </div>
        <div className={styles.scoreCardSection} data-tip data-for="coi">
          <div className={styles.ratingList}>
            <div className={styles.ratingListItem}>
              <div className={styles.ratingListScore}>
                <StarRating rating={props.assessment.disclosureAndManagementOfFinancialConflict} />
              </div>
              <div className={styles.ratingListDesc}>
                <h3 className={styles.scoreCardHeading}>
                  Disclosure and Management of Financial COIs
                </h3>
              </div>
            </div>
          </div>
          <ReactTooltip type="info" className={styles.tooltip} id="coi" multiline>
            <div>
              <br />
              Assesses whether financial conflicts of interests of guideline
              <br />
              development group members have been disclosed and managed.
              <br />
              <br />
            </div>
          </ReactTooltip>
        </div>
        <div className={styles.scoreCardSection} data-tip data-for="er">
          <div className={styles.ratingList}>
            <div className={styles.ratingListItem}>
              <div className={styles.ratingListScore}>
                <StarRating rating={props.assessment.externalReview} />
              </div>
              <div className={styles.ratingListDesc}>
                <h3 className={styles.scoreCardHeading}>External Review</h3>
              </div>
            </div>
          </div>
          <ReactTooltip type="info" className={styles.tooltip} id="er" multiline>
            <div>
              <br />
              Assesses the extent to which the guideline has been reviewed by
              <br />
              relevant stakeholders, including scientific and clinical experts,
              <br />
              organizations, agencies, and patients.
              <br />
              <br />
            </div>
          </ReactTooltip>
        </div>
        <div className={styles.scoreCardSection} data-tip data-for="updating">
          <div className={styles.ratingList}>
            <div className={styles.ratingListItem}>
              <div className={styles.ratingListScore}>
                <StarRating rating={props.assessment.updating} />
              </div>
              <div className={styles.ratingListDesc}>
                <h3 className={styles.scoreCardHeading}>Updating</h3>
              </div>
            </div>
          </div>
          <ReactTooltip type="info" className={styles.tooltip} id="updating" multiline>
            <div>
              <br />
              Assesses the extent to which the guideline described
              <br />a procedure to update the guideline.
              <br />
              <br />
            </div>
          </ReactTooltip>
        </div>
      </div>
    </div>
  </div>
);

export default TrustScoreCard;
