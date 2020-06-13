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
      <div>
        <LibNav stripes={stripes} />
        <main style={{ marginTop: '70px' }}>
          <AppsNav stripes={stripes} />
        </main>
      </div>
    );
  }
}

export default (MainNav);
