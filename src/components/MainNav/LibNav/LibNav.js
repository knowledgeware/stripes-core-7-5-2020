/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual, find } from 'lodash';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import localforage from 'localforage';

import { Button, Icon, Dropdown, NavListItem } from '@folio/stripes-components';
import { withModules } from '../../Modules';
import { clearOkapiToken, clearCurrentUser } from '../../../okapiActions';
import { resetStore } from '../../../mainActions';
import {
  updateQueryResource,
  getLocationQuery,
  updateLocation,
  getCurrentModule,
  isQueryResourceModule,
} from '../../../locationService';

import css from './LibNav.css';
import ProfileDropdown from '../ProfileDropdown';

import UserLocalesSwitcher from '../UserLocalesSwitcher/UserLocalesSwitcher';
import LibNavLogo from '../kwareict.png';
// import ToggleNav from './ToggleNav/ToggleNav';
// import NavDropdownMenu from '../NavDropdownMenu';
// import LibNavButton from './LibNavButton';

class LibNav extends Component {
  static propTypes = {
    stripes: PropTypes.shape({
      store: PropTypes.shape({
        dispatch: PropTypes.func.isRequired,
      }),
      hasPerm: PropTypes.func.isRequired,
      withOkapi: PropTypes.bool,
    }),
    history: PropTypes.shape({
      listen: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    modules: PropTypes.shape({
      app: PropTypes.array,
    }),
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    // It seems wrong that we have to tell this generic component what specific properties to put in the context
    stripes: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      userMenuOpen: false,
    };
    this.store = props.stripes.store;
    this.logout = this.logout.bind(this);
  }

  getChildContext() {
    return {
      stripes: this.props.stripes,
    };
  }

  componentDidMount() {
    let curQuery = getLocationQuery(this.props.location);
    this._unsubscribe = this.store.subscribe(() => {
      const { history, location } = this.props;
      const module = this.curModule;
      const state = this.store.getState();

      // If user has timed out, force them to log in again.
      if (
        state?.okapi?.token &&
        state.okapi.authFailure &&
        find(state.okapi.authFailure, { type: 'error', code: 'user.timeout' })
      ) {
        this.returnToLogin();
      }
      if (module && isQueryResourceModule(module, location)) {
        curQuery = updateLocation(
          module,
          curQuery,
          this.store,
          history,
          location
        );
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { modules, location } = this.props;
    this.curModule = getCurrentModule(modules, location);
    if (this.curModule && !isEqual(location, prevProps.location)) {
      updateQueryResource(location, this.curModule, this.store);
    }
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  // setInitialState(callback) {
  //   this.setState({
  //     dropdownOpen: false,
  //   }, callback);
  // }

  // toggleDropdown = () => {
  //   this.setState(({ dropdownOpen }) => ({
  //     dropdownOpen: !dropdownOpen
  //   }));
  // }

  // toggleUserMenu() {
  //   const isOpen = this.state.userMenuOpen;
  //   this.setState({
  //     userMenuOpen: !isOpen,
  //   });
  // }

  // Return the user to the login screen, but after logging in they will return to their previous activity.
  returnToLogin() {
    this.store.dispatch(clearOkapiToken());
    this.store.dispatch(clearCurrentUser());
    this.store.dispatch(resetStore());
    localforage.removeItem('okapiSess');
  }

  // return the user to the login screen, but after logging in they will be brought to the default screen.
  logout() {
    this.returnToLogin();
    this.props.history.push('/');
  }

  navigateByUrl(link) {
    this.props.history.push(link.route);
  }

  settingsButtonClick = () => {
    this.navigateByUrl({ route: '/settings' });
  }

  homeButtonClick = () => {
    this.navigateByUrl({ route: '/' });
  }

  render() {
    const { stripes } = this.props;

    return (
      <div>
        <header className={css.LibNav}>
          <nav className={css.LibNav_nav}>
            <div className={css.LibNav_Logo}>
              {/* <Link to="/"> */}
              <img className={css.LibNav_Logo} src={LibNavLogo} alt="LibNavLogo" />
              {/* </Link> */}
            </div>
            <div className={css.spaccer} />
            <div className={css.LibNav_nav_items}>
              <ul>
                <li>
                  <ProfileDropdown onLogout={this.logout} stripes={stripes} />
                </li>
                {/* <li>
                  <Button buttonStyle="dropdownItem" onClick={this.settingsButtonClick}>
                    <Icon icon="settings" />
                  </Button>
                </li> */}
                {/* <li>
                  <Button buttonStyle="dropdownItem" onClick={this.homeButtonClick}>
                    <Icon icon="house" />
                  </Button>
                </li> */}
                <li>
                  <UserLocalesSwitcher stripes={stripes} />
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default compose(injectIntl, withRouter, withModules)(LibNav);
