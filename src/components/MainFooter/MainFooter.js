/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

import css from './MainFooter.css';

import kwareictLogo from './images/kwareict.png';
import FOLIOLogo from './images/FOLIO_Logo.png';
import OpenLibraryLogo from './images/OpenLibraryFoundation.png';
import EBSCOLogo from './images/EBSCOLogo.png';
import IndexDataLogo from './images/IndexDataLogo.png';
import KIntLogo from './images/K-intLogo.png';

class MainFooter extends Component {
  render() {
    return (
      <div>
        <header className={css.Footer}>
          <nav className={css.Footer_nav}>
            <div className={css.Footer_Logo}>
              <a href="https://www.folio.org" rel="noopener noreferrer" target="_blank">
                <img className={css.Footer_Logo} src={FOLIOLogo} alt="FOLIOLogo" />
              </a>
            </div>
            <div className={css.spaccer} />
            <div className={css.Footer_nav_items}>
              <ul>
                <li>
                  <a href="http://www.kwareict.com" rel="noopener noreferrer" target="_blank">
                    <img className={css.Footer_Logo} src={kwareictLogo} alt="FooterLogo" />
                  </a>
                </li>
                <li>
                  <a href="https://www.ebsco.com" rel="noopener noreferrer" target="_blank">
                    <img className={css.Footer_EBSCO_Logo} src={EBSCOLogo} alt="FooterLogo" />
                  </a>
                </li>
                <li>
                  <a href="https://www.indexdata.com" rel="noopener noreferrer" target="_blank">
                    <img className={css.Footer_IndexData_Logo} src={IndexDataLogo} alt="FooterLogo" />
                  </a>
                </li>
                <li>
                  <a href="https://www.k-int.com" rel="noopener noreferrer" target="_blank">
                    <img className={css.Footer_Logo} src={KIntLogo} alt="FooterLogo" />
                  </a>
                </li>
              </ul>
            </div>
            <div className={css.spaccer} />
            <div>
              <a href="https://openlibraryfoundation.org" rel="noopener noreferrer" target="_blank">
                <img className={css.Footer_OpenLibrary_Logo} src={OpenLibraryLogo} alt="FooterLogo" />
              </a>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default MainFooter;
