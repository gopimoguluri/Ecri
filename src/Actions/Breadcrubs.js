const breadCrumbClicked = () => ({
    type: 'BREADCRUMB_CLICKED',
  });
  
  const breadCrumbFollowed = () => ({
    type: 'BREADCRUMB_USED',
  });
  
  const addBreadCrumb = ({ title, location }) => ({
    type: 'BREADCRUMB_ADDED',
    crumb: { title, location },
  });
  
  export { breadCrumbClicked, addBreadCrumb, breadCrumbFollowed };
  