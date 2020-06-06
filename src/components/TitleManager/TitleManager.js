import React from 'react';
import PropTypes from 'prop-types';
import { Titled } from 'react-titled';
import { injectIntl, intlShape } from 'react-intl';
import { withStripes } from '../../StripesContext';

const APP = 'FOLIO';

class TitleManager extends React.Component {
  static propTypes = {
    intl: intlShape.isRequired,
    children: PropTypes.node,
    page: PropTypes.string,
    record: PropTypes.string,
    stripes: PropTypes.shape({
      config: PropTypes.shape({
        platformName: PropTypes.string,
      }),
    }).isRequired,
  }

  renderTitle = (currentTitle) => {
    const { page, record, intl } = this.props;

    if (typeof currentTitle !== 'string') return '';

    const tokens = currentTitle.split(' - ');
    if (page) tokens[0] = intl.formatMessage({ id: `${page}`, defaultMessage: `${page}` });
    if (record) tokens[1] = record;

    tokens[2] = (this.props.stripes.config || {}).platformName || APP;

    return tokens
      .filter(t => t)
      .join(' - ');
  }

  render() {
    return (
      <Titled title={this.renderTitle}>
        {this.props.children}
      </Titled>
    );
  }
}

export default injectIntl(withStripes(TitleManager));
