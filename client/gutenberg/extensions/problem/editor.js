/** @format */

/**
 * Internal dependencies
 */
import catgif from './cat-gif-at@-amp%-q?-colon:.gif';
import catgifuri from './cat-gif-at@-amp%25-q?-colon:.gif';
import catgifuricomponent from './cat-gif-at%40-amp%25-q%3F-colon%3A.gif';

window.onload = () => {
	console.log( 'raw: %o', catgif );
	console.log( 'encodeuri: %o', catgifuri );
	console.log( 'encodeuricomponent: %o', catgifuricomponent );
};
