import React from 'react';
import PropTypes from 'prop-types';
import ShowMoreLink from '../ShowMoreLink';

class ShowMoreContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementsToShow: props.pageSize,
      text: props.moreText,
      arrowPosition: 'right',
    };
  }

  handleClick() {
    const { loadAllOnClick, childData } = this.props;
    if (loadAllOnClick) {
      this.setState({ elementsToShow: childData.length });
    }

    this.setState((prevState, props) => ({
      elementsToShow: Math.min(props.childData.length, prevState.elementsToShow + props.pageSize),
    }));
  }

  render() {
    const { childData, childMapFunc, pageSize } = this.props;
    const { elementsToShow } = this.state;

    if (elementsToShow === childData.length) {
      return <React.Fragment>{childData.map(c => childMapFunc(c))}</React.Fragment>;
    }

    return (
      <React.Fragment>
        {childData.slice(0, elementsToShow).map(c => childMapFunc(c))}
        {pageSize < childData.length && (
          <ShowMoreLink {...this.state} onClick={() => this.handleClick()} />
        )}
      </React.Fragment>
    );
  }
}

ShowMoreContainer.propTypes = {
  pageSize: PropTypes.number.isRequired,
  childData: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.object, PropTypes.string)).isRequired,
  childMapFunc: PropTypes.func.isRequired,
  moreText: PropTypes.string,
  lessText: PropTypes.string,
  loadAllOnClick: PropTypes.bool,
};

ShowMoreContainer.defaultProps = {
  moreText: 'Show More',
  lessText: 'Show Less',
  loadAllOnClick: false,
};

export default ShowMoreContainer;
