import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LibNav from './LibNav/LibNav';
import AppsNav from './AppsNav/AppsNav';

class MainNav extends Component {
  static propTypes = {
    stripes: PropTypes.object.isRequired,
  };

  render() {
    const { stripes } = this.props;
    return (
      <>
        <LibNav stripes={stripes} />
        <div key={this.props.stripes.locale}>
          <AppsNav stripes={stripes} />
        </div>
      </>
    );
  }
}

export default (MainNav);
