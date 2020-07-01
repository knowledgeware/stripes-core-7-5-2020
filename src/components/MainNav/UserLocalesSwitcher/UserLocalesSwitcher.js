import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Dropdown } from '@folio/stripes-components/lib/Dropdown';
import NavList from '@folio/stripes-components/lib/NavList';
import NavListSection from '@folio/stripes-components/lib/NavListSection';
import NavListItem from '@folio/stripes-components/lib/NavListItem';
import Icon from '@folio/stripes-components/lib/Icon';

import uniqueId from 'lodash/uniqueId';
import { DropdownMenu, Badge } from '@folio/stripes-components';
import LibNavButton from '../LibNav/LibNavButton/LibNavButton';
import css from './UserLocalesSwitcher.css';

class UserLocalesSwitcher extends Component {
  static propTypes = {
    stripes: PropTypes.shape({
      setLocale: PropTypes.func,
      setDateformat: PropTypes.func,
      okapi: PropTypes.object,
      locale: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
    this.id = uniqueId('userLocalesDropdown-');
  }

  setInitialState(callback) {
    this.setState({
      dropdownOpen: false,
    }, callback);
  }

  toggleDropdown = () => {
    this.setState(({ dropdownOpen }) => ({
      dropdownOpen: !dropdownOpen
    }));
  }

  ImportLocalesIcones() {
    const req = require.context('!!react-svg-loader!./localesIcons/', true, /\.svg$/);
    return req.keys().reduce((images, path) => Object.assign(images, {
      [path.slice(2, path.length - 4)]: req(path).default,
    }), {});
  }

  setLocale = (locale) => {
    if (locale) {
      this.props.stripes.setLocale(locale.value);
      this.props.stripes.setDateformat(locale.defaultDateFormat);
      this.toggleDropdown();
    }
  };

  getDropdownContent = () => {
    const { stripes: { userPreferredLocale, locale, tenantDefaultLocale } } = this.props;
    let { stripes: { userLocales, tenantLocales } } = this.props;

    const LocalesIcons = this.ImportLocalesIcones();

    const style = {
      'display': 'flex',
      'flex': 1,
      'justifyContent': 'space-between',
    };

    if (userLocales && userLocales.length && (userPreferredLocale !== locale)) {
      userLocales = userLocales.filter(ul => ul.value !== locale);
    }

    if (tenantLocales && tenantLocales.length && (tenantDefaultLocale !== locale)) {
      tenantLocales = tenantLocales.filter(ul => ul.value !== locale);
    }

    return (
      <NavList>
        <NavListSection>
          {!userLocales || userLocales.length === 0 ?
            (tenantLocales && tenantLocales.map(tl => (
              <NavListItem
                id={`clickable-locale-${tl.value}`}
                type="button"
                onClick={() => this.setLocale(tl)}
                disabled={tl.value === locale}
              >
                <div style={style}>
                  <Icon icon={LocalesIcons[tl.value] ? LocalesIcons[tl.value] : 'flag'}>
                    <FormattedMessage id={`stripes-core.ul.button.languageName.${tl.value}`} />
                  </Icon>
                  {(tenantDefaultLocale && (tl.value === tenantDefaultLocale)) &&
                    <div>
                      <Badge><FormattedMessage id="stripes-core.languageSwitcher.tenantDefaultLocale" /></Badge>
                    </div>}
                </div>
              </NavListItem>
            )))
            : (userLocales && userLocales.map(ul => (
              <NavListItem
                id={`clickable-locale-${ul.value}`}
                type="button"
                onClick={() => this.setLocale(ul)}
                disabled={ul.value === locale}
              >
                <div style={style}>
                  <Icon icon={LocalesIcons[ul.value] ? LocalesIcons[ul.value] : 'flag'}>
                    <FormattedMessage id={`stripes-core.ul.button.languageName.${ul.value}`} />
                  </Icon>
                  {(userPreferredLocale && (ul.value === userPreferredLocale)) &&
                    <div>
                      <Icon icon={LocalesIcons.star} />
                    </div>}
                </div>
              </NavListItem>
            )))
        }
        </NavListSection>
      </NavList>
    );
  }

  renderProfileTrigger = ({ getTriggerProps, open }) => {
    const { stripes: { locale } } = this.props;

    const labelElement = (
      <Icon iconPosition="end" icon={open ? 'caret-up' : 'caret-down'}>
        {locale.split('-')[0]}
      </Icon>
    );

    const LocalesIcons = this.ImportLocalesIcones();

    return (
      <FormattedMessage id="stripes-core.mainnav.myProfileAriaLabel">
        {label => (
          <LibNavButton
            label={labelElement}
            data-role="toggle"
            ariaLabel={label}
            selected={open}
            icon={LocalesIcons[locale] ? <Icon icon={LocalesIcons[locale]} /> : <Icon icon="flag" />}
            {...getTriggerProps()}
          />)
        }
      </FormattedMessage>
    );
  }

  renderProfileMenu = ({ open }) => (
    <DropdownMenu open={open}>
      {this.getDropdownContent()}
    </DropdownMenu>
  );

  render() {
    const { dropdownOpen } = this.state;
    const { stripes: { tenantLocales } } = this.props;

    return (
      <>
        <Dropdown
          id="userLanguageSwitcherDropdown"
          renderTrigger={this.renderProfileTrigger}
          renderMenu={this.renderProfileMenu}
          open={dropdownOpen}
          onToggle={this.toggleDropdown}
          pullRight
          placement="bottom-end"
          relativePosition
          disabled={!tenantLocales}
          focusHandlers={{ open: () => null }}
        />
      </>
    );
  }
}

export default UserLocalesSwitcher;
