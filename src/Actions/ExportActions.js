import { fetchFileExport } from '../api';
import briefSelectionActions from './briefSelectionActions';
import snackBarNotify from '../utils/snackbarnotifier';
import * as actionTypes from './exportActionTypes';

const exportBriefsAction = (
  user,
  selectedBriefs,
  excludedBriefs,
  searchPhrase,
  sort,
  filters,
  exportType
) => ({
  type: actionTypes.EXPORT_BRIEF_REQUESTED,
  payload: {
    user: user,
    selectedBriefs: selectedBriefs,
    excludedBriefs: excludedBriefs,
    searchTerm: searchPhrase,
    sort: sort,
    filters: filters,
    exportType: exportType,
  },
});

const exportBriefsSuccessAction = () => ({
  type: actionTypes.EXPORT_BRIEFS_SUCCESS,
});

const exportBriefsFailureAction = err => ({
  type: actionTypes.EXPORT_BRIEF_FAILURE,
  payload: { error: err },
});

const getBlobFormat = exportFormat => {
  switch (exportFormat) {
    case 'ris':
      return {
        blobType: 'application/x-Research-Info-Systems',
        fileExt: 'ris',
      };
    case 'xml':
      return {
        blobType: 'application/xml',
        fileExt: 'xml',
      };
    case 'csv':
      return {
        blobType: 'text/csv',
        fileExt: 'csv',
      };
    default:
      return {
        blobType: 'text/plain',
        fileExt: 'txt',
      };
  }
};

const actionCreators = {
  exportBriefs: (
    user,
    selectedBriefs,
    excludedBriefs,
    searchPhrase,
    sort,
    filters,
    exportType
  ) => dispatch => {
    dispatch(
      exportBriefsAction(
        user,
        selectedBriefs,
        excludedBriefs,
        searchPhrase,
        sort,
        filters,
        exportType
      )
    );

    let exportPayload = {
      selectedBriefs: selectedBriefs,
      excludedBriefs: excludedBriefs,
      searchPhrase: searchPhrase,
      sort: sort,
      filters: filters,
      exportType: exportType,
      user: user,
    };
    let blobFormat = getBlobFormat(exportType);

    fetchFileExport(user, exportPayload)
      .then(resp => {
        let blob = new Blob([resp.data], { type: blobFormat.blobType });
        const url = window.URL.createObjectURL(blob);
        const filename = `export.${blobFormat.fileExt}`;
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
          let url = window.URL.createObjectURL(blob);
        }

        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.outerHTML = '';

        dispatch(exportBriefsSuccessAction());
        dispatch(briefSelectionActions.clearBriefSelections());
        snackBarNotify('Export Successful!', 'success');
      })
      .catch(error => {
        dispatch(exportBriefsFailureAction(error));
        snackBarNotify('Unable to export search results', 'error');
      });
  },
};

export default actionCreators;
