/** @format */

/**
 * External dependencies
 */
import { localize } from 'i18n-calypso';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import Card from 'components/card';
import StepWrapper from 'signup/step-wrapper';
import FormLabel from 'components/forms/form-label';
import InfoPopover from 'components/info-popover';
import FormFieldset from 'components/forms/form-fieldset';
import SiteVerticalsSuggestionSearch from 'components/site-verticals-suggestion-search';
import { submitSiteTopic, setSiteTopic } from 'state/signup/steps/site-topic/actions';
import { getSignupStepsSiteTopic } from 'state/signup/steps/site-topic/selectors';
import { getSiteType } from 'state/signup/steps/site-type/selectors';
import { recordTracksEvent } from 'state/analytics/actions';
import SignupActions from 'lib/signup/actions';
import { getSiteTypePropertyValue } from 'lib/signup/site-type';

/**
 * Style dependencies
 */
import './style.scss';

class SiteTopicStep extends Component {
	static propTypes = {
		flowName: PropTypes.string,
		goToNextStep: PropTypes.func.isRequired,
		positionInFlow: PropTypes.number.isRequired,
		submitSiteTopic: PropTypes.func.isRequired,
		signupProgress: PropTypes.array,
		stepName: PropTypes.string,
		siteTopic: PropTypes.string,
		siteType: PropTypes.string,
		translate: PropTypes.func.isRequired,
	};

	constructor( props ) {
		super( props );
		this.state = {
			siteTopicValue: props.siteTopic || '',
		};
	}

	componentDidMount() {
		SignupActions.saveSignupStep( {
			stepName: this.props.stepName,
		} );
	}

	onSiteTopicChange = ( { vertical_name, vertical_slug } ) => {
		this.setState( {
			siteTopicValue: vertical_name,
			siteTopicSlug: vertical_slug,
		} );
		if ( this.props.flowName === 'onboarding-dev' ) {
			this.props.setSiteTopic( vertical_name );
		}
	};

	onSubmit = event => {
		event.preventDefault();
		this.props.submitSiteTopic( this.state );
	};

	renderContent( topicLabel ) {
		const { translate } = this.props;

		return (
			<Card className="site-topic__content">
				<form onSubmit={ this.onSubmit }>
					<FormFieldset>
						<FormLabel htmlFor="siteTopic">
							{ topicLabel }
							<InfoPopover className="site-topic__info-popover" position="top">
								{ translate( "We'll use this to personalize your site and experience." ) }
							</InfoPopover>
						</FormLabel>
						<SiteVerticalsSuggestionSearch
							onChange={ this.onSiteTopicChange }
							initialValue={ this.state.siteTopicValue }
						/>
					</FormFieldset>
					<div className="site-topic__submit-wrapper">
						<Button type="submit" disabled={ ! this.state.siteTopicValue } primary>
							{ translate( 'Continue' ) }
						</Button>
					</div>
				</form>
			</Card>
		);
	}

	getTextFromSiteType() {
		const { siteType, translate } = this.props;

		const headerText = getSiteTypePropertyValue( 'slug', siteType, 'siteTopicHeader' ) || '';
		const topicLabel = getSiteTypePropertyValue( 'slug', siteType, 'siteTopicLabel' ) || '';
		// once we have more granular copies per segments, these two should only be used for the default case.
		const commonSubHeaderText = translate( "Don't stress, you can change this later." );

		return {
			headerText,
			commonSubHeaderText,
			topicLabel,
		};
	}

	render() {
		const { headerText, commonSubHeaderText, topicLabel } = this.getTextFromSiteType();

		return (
			<div>
				<StepWrapper
					flowName={ this.props.flowName }
					stepName={ this.props.stepName }
					positionInFlow={ this.props.positionInFlow }
					headerText={ headerText }
					fallbackHeaderText={ headerText }
					subHeaderText={ commonSubHeaderText }
					fallbackSubHeaderText={ commonSubHeaderText }
					signupProgress={ this.props.signupProgress }
					stepContent={ this.renderContent( topicLabel ) }
				/>
			</div>
		);
	}
}

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	submitSiteTopic: ( { siteTopicSlug, siteTopicValue } ) => {
		const { flowName, goToNextStep } = ownProps;

		dispatch(
			recordTracksEvent( 'calypso_signup_actions_submit_site_topic', {
				value: siteTopicSlug,
			} )
		);

		dispatch( submitSiteTopic( siteTopicValue ) );

		goToNextStep( flowName );
	},

	setSiteTopic: siteTopic => {
		dispatch( setSiteTopic( siteTopic ) );
	},
} );

export default localize(
	connect(
		state => ( {
			siteTopic: getSignupStepsSiteTopic( state ),
			siteType: getSiteType( state ),
		} ),
		mapDispatchToProps
	)( SiteTopicStep )
);
