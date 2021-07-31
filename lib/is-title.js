const TITLE_REGEXP = /^\s*глава\s+\d+\s*$/i;

/**
 * @param {string} text
 */
export function isTitle( text )
{
	return TITLE_REGEXP.test( text );
}
