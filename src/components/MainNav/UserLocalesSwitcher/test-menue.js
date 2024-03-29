import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Dropdown } from '@folio/stripes-components/lib/Dropdown';
import NavList from '@folio/stripes-components/lib/NavList';
import NavListSection from '@folio/stripes-components/lib/NavListSection';
import NavListItem from '@folio/stripes-components/lib/NavListItem';
import Icon from '@folio/stripes-components/lib/Icon';

import uniqueId from 'lodash/uniqueId';
import NavDropdownMenu from '../NavDropdownMenu';
import LibNavButton from '../LibNav/LibNavButton/LibNavButton';
import { DropdownMenu } from '@folio/stripes-components';

class UserLocalesSwitcher extends Component {
  static propTypes = {
    stripes: PropTypes.shape({
      setLocale: PropTypes.func,
      setTranslations: PropTypes.func,
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
      HandlerComponent: null,
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
    if (locale) this.props.stripes.setLocale(locale);
    this.toggleDropdown();
  };

  getDropdownContent = () => {
    const { stripes: { userPreferredLocale, locale } } = this.props;
    let { stripes: { userLocales } } = this.props;

    const LocalesIcons = this.ImportLocalesIcones();

    const style = {
      'display': 'flex',
      'flex': 1,
      'justifyContent': 'space-between',
    };

    if (userLocales && userLocales.length && (userPreferredLocale !== locale)) {
      userLocales = userLocales.filter(ul => ul.value !== locale);
    }

    return (
      <NavList>
        <NavListSection>
          {userLocales && userLocales.map(ul => (
            <NavListItem
              id={`clickable-locale-${ul.value}`}
              type="button"
              onClick={() => this.setLocale(ul.value)}
              disabled={ul.value === locale}
            >
              <div style={style}>
                <Icon icon={LocalesIcons[ul.value] ? LocalesIcons[ul.value] : 'flag'}>
                  <FormattedMessage id={`stripes-core.ul.button.languageName.${ul.value}`} />
                </Icon>
                {(userPreferredLocale && (ul.value === userPreferredLocale)) &&
                  <div>
                    {[...Array(1)].map(() => <Icon icon={LocalesIcons.star} />)}
                  </div>}
              </div>
            </NavListItem>
          ))}
        </NavListSection>
      </NavList>
    );
  }

  renderProfileTrigger = ({ getTriggerProps, open }) => {
    const { stripes: { locale, userLocales } } = this.props;

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
            // data-role="toggle"
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
    <NavDropdownMenu open={open}>
      {this.getDropdownContent()}
    </NavDropdownMenu>
  );

  render() {
    const { dropdownOpen, HandlerComponent } = this.state;
    const { stripes: { locale, userLocales } } = this.props;

    // const label = (
    //   <Icon iconPosition="end" icon={dropdownOpen ? 'caret-up' : 'caret-down'}>
    //     {locale.split('-')[0]}
    //   </Icon>
    // );

    // const LocalesIcons = this.ImportLocalesIcones();

    return (
      <>
        { HandlerComponent && <HandlerComponent stripes={this.props.stripes} /> }
        <Dropdown
          renderTrigger={this.renderProfileTrigger}
          renderMenu={this.renderProfileMenu}
          open={dropdownOpen}
          id={this.id}
          onToggle={this.toggleDropdown}
          // pullRight
          // hasPadding
          // relativePosition
          placement="bottom-end"
          relativePosition
          usePortal={false}
          disabled={userLocales && userLocales.length === 1}
          focusHandlers={{ open: () => null }}
        >
          {/* <LibNavButton
            label={label}
            data-role="toggle"
            ariaLabel="userLocalesSwitcher"
            selected={dropdownOpen}
            icon={LocalesIcons[locale] ? <Icon icon={LocalesIcons[locale]} /> : <Icon icon="flag" />}
          />
          <DropdownMenu data-role="menu" open={dropdownOpen} onToggle={this.toggleDropdown}>
            {this.getDropdownContent()}
          </DropdownMenu> */}
        </Dropdown>
      </>
    );
  }
}

export default UserLocalesSwitcher;
