const DINKUS_REGEXP = /^\s*(?:\*\s*){3,}$/;

/**
 * @param {string} text
 */
export function isDinkus( text )
{
	return DINKUS_REGEXP.test( text );
}
