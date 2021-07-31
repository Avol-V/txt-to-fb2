const EMPTY_LINE_REGEXP = /^\s*$/;

/**
 * @param {string} text
 */
export function isEmpty( text )
{
	return EMPTY_LINE_REGEXP.test( text );
}
