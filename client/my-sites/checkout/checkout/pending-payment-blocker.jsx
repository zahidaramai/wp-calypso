/** @format */

/**
 * External dependencies
 */
import React from 'react';
//import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import Gridicon from 'gridicons';

/**
 * Internal dependencies
 */
import Button from 'components/button';

export function PendingPaymentBlocker( { translate } ) {
	return (
		<React.Fragment>
			<div className="checkout__payment-box-sections">
				<div className="checkout__payment-box-section">
					{ translate(
						"Your last order's payment is still pending please complete that payment before continuuing with a new purchase."
					) }

					<div className="checkout__list-item-actions">
						<Button primary={ false } href="/help/contact">
							<Gridicon icon="help" />
							<span>{ translate( 'Contact Support' ) }</span>
						</Button>
					</div>
					<div className="checkout__list-item-actions">
						<Button primary={ true } href="/me/purchases/pending">
							<span>{ translate( 'View Pending' ) }</span>
						</Button>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default localize( PendingPaymentBlocker );
