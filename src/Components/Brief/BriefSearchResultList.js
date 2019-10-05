import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BriefSearchResultItem from '../BriefSearchResultItem';
import LoadingSpinner from '../LoadingSpinner';
import { deepMap } from '../../utils/helpers';
import styles from './briefSearchResultList.module.scss';
import { fetchBriefs } from '../../api';

class BriefSearchResultList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      briefData: [],
      loading: true,
      checkboxes: []
    };
  }

  componentDidMount() {
    console.log("Component BreifSearchResultList mounted!");
    fetchBriefs(0, 100, this.props.user.access_token).then((data) => {
      const mappedData = deepMap(data.data, (val, key) => (val == null ? '' : val));
      this.setState({
        briefData: mappedData,
        loading: false,
        checkboxes: mappedData.reduce(
          (mappedDataArr, dataItem) => ({
            ...mappedDataArr,
            [dataItem.uniqueId]: false
          }),
          {}
        )
      });
    });
  }

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;
    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }))
  }

  render() {
    console.log("SearchResultList rendered!");
    const { loading, briefData } = this.state;
    if (loading) {
      return <LoadingSpinner />;
    }

    return (
      <div className={`${styles.resultsList} results-list`}>
        {briefData.map(brief => (
          <BriefSearchResultItem key={brief.uniqueId} brief={brief} handleCheckboxChange={handleCheckboxChange} checkboxes={} />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
  };
}

export default withRouter(connect(mapStateToProps)(BriefSearchResultList));
