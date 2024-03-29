import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual, find } from 'lodash';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router';
import localforage from 'localforage';

import { Link } from 'react-router-dom';
import { withModules } from '../../Modules';
import { LastVisitedContext } from '../../LastVisited';
import { clearOkapiToken, clearCurrentUser } from '../../../okapiActions';
import { resetStore } from '../../../mainActions';
import {
  updateQueryResource,
  getLocationQuery,
  updateLocation,
  getCurrentModule,
  isQueryResourceModule
} from '../../../locationService';

import css from './AppsNav.css';
import { CurrentAppGroup } from '../CurrentApp';
import AppList from '../AppList';
import { SkipLink } from '../components';

import settingsIcon from './settings.svg';
import FOLIOLogo from './FOLIO_Logo.png';

class AppsNav extends Component {
  static propTypes = {
    intl: intlShape,
    stripes: PropTypes.shape({
      config: PropTypes.shape({
        showPerms: PropTypes.bool,
      }),
      locale: PropTypes.string,
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
    })
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

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
    this.getAppList = this.getAppList.bind(this);
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
      if (state?.okapi?.token && state.okapi.authFailure
        && find(state.okapi.authFailure, { type: 'error', code: 'user.timeout' })) {
        this.returnToLogin();
      }
      if (module && isQueryResourceModule(module, location)) {
        curQuery = updateLocation(module, curQuery, this.store, history, location);
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

  toggleUserMenu() {
    const isOpen = this.state.userMenuOpen;
    this.setState({
      userMenuOpen: !isOpen,
    });
  }

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

  getAppList(lastVisited) {
    const { stripes, location: { pathname }, modules, intl: { formatMessage } } = this.props;

    const apps = modules.app.map((entry) => {
      const name = entry.module.replace(/^@[a-z0-9_]+\//, '');
      const perm = `module.${name}.enabled`;

      if (!stripes.hasPerm(perm)) {
        return null;
      }

      const id = `clickable-${name}-module`;

      const pathRoot = pathname.split('/')[1];
      const entryRoot = entry.route.split('/')[1];
      const active = pathRoot === entryRoot;

      const last = lastVisited[name];
      const home = entry.home || entry.route;
      const href = (active || !last) ? home : lastVisited[name];

      return {
        id,
        href,
        active,
        name,
        ...entry,
      };
    }).filter(app => app);

    apps.map(app => {
      if (app.href) {
        app.displayName = formatMessage({ id: `ui-${app.name}.meta.title`, defaultMessage: `${app.name}` });
      }
      return null;
    });

    /**
     * Add Settings to apps array manually
     * until Settings becomes a standalone app
     */

    if (stripes.hasPerm('settings.enabled')) {
      apps.push({
        displayName: formatMessage({ id: 'stripes-core.settings' }),
        id: 'clickable-settings',
        href: lastVisited.x_settings || '/settings',
        active: pathname.startsWith('/settings'),
        description: 'FOLIO settings',
        iconData: {
          src: settingsIcon,
          alt: 'Tenant Settings',
          title: 'Settings',
        },
        route: '/settings'
      });
    }

    return apps;
  }

  render() {
    const { stripes } = this.props;

    return (
      <LastVisitedContext.Consumer>
        {({ lastVisited }) => {
          const apps = this.getAppList(lastVisited);
          const selectedApp = apps.find(entry => entry.active);

          return (
            <header className={css.navRoot}>
              <div className={css.startSection}>
                <SkipLink />
                <CurrentAppGroup selectedApp={selectedApp} config={stripes.config} />
                {/* <Link to="/">
                  <img className={css.AppsNav_Logo} src={FOLIOLogo} alt="FOLIOLogo" />
                </Link> */}
              </div>
              <nav aria-labelledby="main_navigation_label" className={css.endSection}>
                <h2 className="sr-only" id="main_navigation_label">
                  <FormattedMessage id="stripes-core.mainnav.topLevelLabel" />
                </h2>
                <AppList
                  apps={apps}
                  selectedApp={selectedApp}
                  dropdownToggleId="app-list-dropdown-toggle"
                />
              </nav>
            </header>
          );
        }}
      </LastVisitedContext.Consumer>
    );
  }
}

export default compose(
  injectIntl,
  withRouter,
  withModules,
)(AppsNav);
