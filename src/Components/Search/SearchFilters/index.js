import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import searchActions from '../../../actions/search';
import PublicationYearFilter from './PublicationYearFilter';
import OrganizationsFilter from './OrganizationsFilter';
import InterventionsFilter from './InterventionsFilter';
import ClinicalAreasFilter from './ClinicalAreasFilter';
import PatientAgesFilter from './PatientAgesFilter';
import ResetFilterButton from './ResetFilterButton';
import InclusionCriteriaFilter from './InclusionCriteriaFilter';
import styles from './searchFilters.module.scss';
import briefSelectionActions from '../../../actions/briefSelectionActions';

const SearchFilters = ({
  searchData,
  updateRefiners,
  clearBriefSelections,
}) => {
  const { filters } = searchData;

  clearBriefSelections();

  const {
    inclusions,
    pubYears,
    organizations,
    interventions,
    clinicalAreas,
    patientAges,
  } = filters;

  const yearsInUse = pubYears
    ? Object.assign(
        {},
        ...Object.keys(pubYears)
          .filter(k => pubYears[k].value > 0)
          .map(k => ({ [k]: pubYears[k] }))
      )
    : {};

  const hasYearFilters = Object.keys(yearsInUse).length > 0;

  const orgsInUse = (organizations || []).filter(o => o.count > 0);
  const hasOrgFilters = orgsInUse.length > 0;

  const patientAgesInUse = (patientAges || []).filter(pa => pa.count > 0);
  const hasPatientAgeFilters = patientAgesInUse.length > 0;

  const clinicalAreasInUse = (clinicalAreas || []).filter(ca => ca.count > 0);
  const hasClinicalAreaFilters = clinicalAreasInUse.length > 0;

  const interventionsInUse = (interventions || []).filter(i => i.count > 0);
  const hasInterventionFilters = interventionsInUse.length > 0;

  const hasAnyFilters =
    hasYearFilters ||
    hasOrgFilters ||
    hasPatientAgeFilters ||
    hasClinicalAreaFilters ||
    hasInterventionFilters;

  return (
    <div className={styles.searchFilters}>
      {hasAnyFilters && (
        <ResetFilterButton
          onClick={() => updateRefiners({ area: 'resetAll' })}
        />
      )}
      {hasAnyFilters && (
        <InclusionCriteriaFilter
          inclusions={inclusions}
          onInclusionCriteriaChange={(k, e) =>
            updateRefiners({
              area: 'inclusions',
              id: k,
              newValue: e,
            })
          }
        />
      )}
      {hasYearFilters && (
        <PublicationYearFilter
          pubYears={yearsInUse}
          onPublicationYearChange={(k, e) =>
            updateRefiners({ area: 'pubYears', id: k, newValue: e })
          }
        />
      )}
      {hasOrgFilters && (
        <OrganizationsFilter
          orgs={orgsInUse}
          onOrganizationFilterChange={(k, e) =>
            updateRefiners({ area: 'organizations', id: k, newValue: e })
          }
        />
      )}
      {hasPatientAgeFilters && (
        <PatientAgesFilter
          patientAges={patientAgesInUse}
          onPatientAgeFilterChange={(k, e) =>
            updateRefiners({ area: 'patientAges', id: k, newValue: e })
          }
        />
      )}
      {hasClinicalAreaFilters && (
        <ClinicalAreasFilter
          clinicalAreas={clinicalAreasInUse}
          onClinicalAreaFilterChange={(k, e) =>
            updateRefiners({ area: 'clinicalAreas', id: k, newValue: e })
          }
        />
      )}
      {hasInterventionFilters && (
        <InterventionsFilter
          interventions={interventionsInUse}
          onInterventionFilterChange={(k, e) =>
            updateRefiners({ area: 'interventions', id: k, newValue: e })
          }
        />
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...searchActions, ...briefSelectionActions }, dispatch);

const mapStateToProps = state => ({
  searchData: state.search,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFilters);
