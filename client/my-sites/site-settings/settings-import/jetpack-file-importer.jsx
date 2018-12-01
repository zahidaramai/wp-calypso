/**
 * External dependencies
 *
 * @format
 */

import React, { PureComponent } from 'react';
import get from 'lodash/get';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { localize } from 'i18n-calypso';
import { startImport } from 'lib/importer/actions';
import { getSelectedSiteId } from 'state/ui/selectors';
import wp from 'lib/wp';
import Button from 'components/button';

const importFileToJetpackSite = ( siteId, args ) =>
	wp.undocumented().jetpackFileImport( siteId, { ...args } );

class JetpackFileImporter extends PureComponent {
	fileInput = {};

	setFileInputRef = element => {
		this.fileInput = element;
	};

	onSubmit = async event => {
		event.preventDefault();
		const file = get( this.fileInput, 'files[0]', null );
		if ( ! file ) {
			return;
		}

		const { siteId } = this.props;

		try {
			const result = await importFileToJetpackSite( siteId, {
				file,
				headers: {},
				options: {},
			} );
			//console.log( { wut: 'jpfileimport', result } );
			return result;
		} catch ( errorImporting ) {
			//console.error( { errorImporting } );
		}
	};

	render() {
		return (
			<div>
				hola mundo
				<br />
				<input ref={ this.setFileInputRef } type="file" />
				<Button onClick={ this.onSubmit }>Upload</Button>
			</div>
		);
	}
}

export default connect(
	state => ( {
		siteId: getSelectedSiteId( state ),
	} ),
	{ startImport }
)( localize( JetpackFileImporter ) );
