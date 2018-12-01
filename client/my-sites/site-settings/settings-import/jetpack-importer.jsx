/** @format */

/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import CompactCard from 'components/card/compact';
import JetpackFileImporter from 'my-sites/site-settings/settings-import/jetpack-file-importer';

class JetpackImporter extends PureComponent {
	render() {
		return (
			<CompactCard>
				<JetpackFileImporter />
			</CompactCard>
		);
	}
}

export default connect(/*state => ( {

} )*/)( localize( JetpackImporter ) );
