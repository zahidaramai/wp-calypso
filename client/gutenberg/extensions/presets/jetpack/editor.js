/** @format */

/**
 * Internal dependencies
 */
import './shared/public-path';
import './editor-shared/block-category'; // Register the Jetpack category
import * as ContactFormBlock from 'gutenberg/extensions/contact-form';
import * as MarkdownBlock from 'gutenberg/extensions/markdown';
import * as MapBlock from 'gutenberg/extensions/map';
import * as PublicizeBlock from 'gutenberg/extensions/publicize';
import * as RelatedPostsBlock from 'gutenberg/extensions/related-posts';
import * as SimplePaymentsBlock from 'gutenberg/extensions/simple-payments';
import * as TiledGalleryBlock from 'gutenberg/extensions/tiled-gallery';
import * as VRBlock from 'gutenberg/extensions/vr';
import * as BusinessHoursBlock from 'gutenberg/extensions/business-hours';
import { isEnabled } from 'config';

export default [
	{ name: ContactFormBlock.name, settings: ContactFormBlock.settings },
	...ContactFormBlock.fields,
	MarkdownBlock,
	MapBlock,
	PublicizeBlock,
	SimplePaymentsBlock,
	...( isEnabled( 'jetpack/blocks/beta' )
		? [ RelatedPostsBlock, TiledGalleryBlock, VRBlock, BusinessHoursBlock ]
		: [] ),
];
