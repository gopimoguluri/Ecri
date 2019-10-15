import axios from 'axios';

axios.defaults.headers.common['Content-type'] = 'application/json';
axios.defaults.baseURL = process.env.REACT_APP_API_URL || '';

const logPageView = logEntry =>
  axios.post('/api/analytics', logEntry, { timeout: 1000 });

const verifyPreviewAccess = token =>
  axios.get('/api/preview/brief/checkaccess', {
    headers: { Authorization: `Bearer ${token}` },
  });

const fetchBriefs = (pageNumber, pageSize, token, usePreview = true) =>
  axios.get(
    `/api/${
      usePreview ? 'preview/' : ''
    }brief/getbriefs/?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=sys.updatedAt&sortOrder=desc
`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

const fetchBrief = (uniqueId, token, usePreview = true) =>
  axios.get(
    `/api/${usePreview ? 'preview/' : ''}brief/getByUniqueId/${uniqueId}
`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

const fetchPage = (slug, user = null, usePreview = false) => {
  if (user !== null && user.access_token !== null && usePreview) {
    return axios.get(`/api/pages/preview/${slug}`, {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
  }
  return axios.get(`/api/pages/${slug}`);
};
const fetchRecentUpdates = (
  token,
  start,
  end,
  searchDirection = 'date',
  numDays = 30
) =>
  axios.get(
    `/api/search/newcontent/?d=${numDays}&sort=${searchDirection}&s=${start}&e=${end}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

const fetchLatestFdaNotices = (
  user = null,
  startIndex = 0,
  size = 10,
  query
) => {
  let apiPayload = {
    StartIndex: startIndex,
    Size: size,
    Query: query,
  };

  return axios.post(`/api/fdanotice/getlatestfdanotices`, apiPayload, {
    headers: { Authorization: `Bearer ${user.access_token}` },
  });
};

const fetchFdaNotices = (user, startIndex = 0, size = 10) => {
  let apiPayload = {
    StartIndex: startIndex,
    Size: size,
    Query: '',
  };

  return axios.post(`/api/fdanotice/getfdanotices`, apiPayload, {
    headers: { Authorization: `Bearer ${user.access_token}` },
  });
};

const fetchAnalyticsQuery = (user = null, searchTerm) => {
  if (user !== null && user.access_token !== null && searchTerm.length > 0) {
    return axios.get(
      `/api/analytics/searchprimaryorganizations/?StartsWith=${searchTerm}`,
      { headers: { Authorization: `Bearer ${user.access_token}` } }
    );
  }
};

const fetchFileExport = (user = null, exportPayload) => {
  //if (user !== null && user.access_token !== null && exportPayload !== null && exportPayload.guidelineIds.length > 0) {
  return axios.post(`/api/export`, exportPayload, {
    //data: exportPayload,
    headers: {
      Authorization: `Bearer ${user.access_token}`,
      //'Accept': 'application/json',
      //'Content-Type': 'application/json',
    },
  });
  //}
};

const fetchAnalyticsReport = (
  user = null,
  exportOnly = false,
  orgId,
  startDate,
  endDate
) => {
  if (user !== null && user.access_token !== null && orgId.length > 0) {
    if (!exportOnly) {
      return axios.get(
        `/api/analytics/getanalytics/?PrimaryOrganizationId=${orgId}&StartDate=${startDate}&EndDate=${endDate}`,
        { headers: { Authorization: `Bearer ${user.access_token}` } }
      );
    } else {
      return axios.get(
        `/api/analytics/exporttoexcel/?PrimaryOrganizationId=${orgId}&StartDate=${startDate}&EndDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
          responseType: 'blob',
        }
      );
    }
  }
};

const refineRecentUpdateSearch = (
  filters,
  token,
  start = 0,
  end = 9,
  numDays = 30
) => {
  const refiners = {
    inclusionCriteria: filters.inclusions.map(x => ({
      id: x.key.Id,
      selected: x.selected,
    })),
    organization: filters.organizations.map(x => ({
      id: x.key.Id,
      selected: x.selected,
    })),
    intervention: filters.interventions.map(x => ({
      id: x.key.Id,
      selected: x.selected,
    })),
    clinicalArea: filters.clinicalAreas.map(x => ({
      id: x.key.Id,
      selected: x.selected,
    })),
    patientAge: filters.patientAges.map(x => ({
      id: x.key.Id,
      selected: x.selected,
    })),
    publicationYear: Object.keys(filters.pubYears).map(k => ({
      Id: k,
      selected: filters.pubYears[k].selected,
    })),
  };
  return axios.post(
    `/api/search/newcontent?d=${numDays}&sort=date&s=${start}&e=${end}`,
    refiners,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const searchBriefs = (
  searchPhrase,
  token,
  searchDirection = 'relevance',
  start = 0,
  end = 9
) =>
  axios.get(
    `/api/search/briefs?q=${encodeURIComponent(
      searchPhrase
    )}&sort=${searchDirection}&s=${start}&e=${end}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

const refineSearchBriefs = (
  searchPhrase,
  filters,
  token,
  searchDirection = 'relevance',
  start = 0,
  end = 9
) => {
  const refiners = {
    inclusionCriteria: filters.inclusions.map(x => ({
      id: x.key.Id,
      selected: x.selected,
    })),
    organization: filters.organizations.map(x => ({
      id: x.key.Id,
      selected: x.selected,
    })),
    intervention: filters.interventions.map(x => ({
      id: x.key.Id,
      selected: x.selected,
    })),
    clinicalArea: filters.clinicalAreas.map(x => ({
      id: x.key.Id,
      selected: x.selected,
    })),
    patientAge: filters.patientAges.map(x => ({
      id: x.key.Id,
      selected: x.selected,
    })),
    publicationYear: Object.keys(filters.pubYears).map(k => ({
      Id: k,
      selected: filters.pubYears[k].selected,
    })),
  };
  return axios.post(
    `/api/search/briefs?q=${encodeURIComponent(
      searchPhrase
    )}&sort=${searchDirection}&s=${start}&e=${end}`,
    refiners,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const requestAccess = email =>
  axios.get(
    `/api/registration/requestaccess?email=${encodeURIComponent(email)}`
  );

const submitNewUser = userData =>
  axios.post('/api/registration/newuserrequest', userData);

const confirmNewUser = confirmationData =>
  axios.post('/api/registration/newuserconfirm', confirmationData);

const registerMember = token =>
  axios.put(
    '/api/registration/existingmember',
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

const updateLastLoginDate = user =>
  axios.post(
    '/api/user/UpdateLastLoginDate',
    {},
    {
      headers: { Authorization: `Bearer ${user.access_token}` },
    }
  );

export {
  fetchAnalyticsQuery,
  fetchAnalyticsReport,
  fetchBriefs,
  fetchBrief,
  fetchRecentUpdates,
  fetchFdaNotices,
  fetchLatestFdaNotices,
  refineRecentUpdateSearch,
  searchBriefs,
  refineSearchBriefs,
  logPageView,
  verifyPreviewAccess,
  requestAccess,
  submitNewUser,
  registerMember,
  confirmNewUser,
  fetchPage,
  fetchFileExport,
  updateLastLoginDate,
};
