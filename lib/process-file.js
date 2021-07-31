import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { isEmpty } from './is-empty.js';
import { isTitle } from './is-title.js';
import { isDinkus } from './is-dinkus.js';
import { asTitle } from './as-title.js';
import { asParagraph } from './as-paragraph.js';
import { EMPTY_LINE } from './empty-line.js';

/**
 * @param {string} path
 */
export async function processFile( path )
{
	const stream = createReadStream( path );
	const lineReader = createInterface( {
		input: stream,
		crlfDelay: Infinity,
	} );
	
	let output = '<section>';
	let buffer = '';
	let emptyLinesCount = 0;
	
	for await ( const line of lineReader )
	{
		if ( isEmpty( line ) || isDinkus( line ) )
		{
			emptyLinesCount++;
			
			continue;
		}
		
		const paragraph = emptyLinesCount > 0;
		const pause = emptyLinesCount > 1;
		
		emptyLinesCount = 0;
		
		if ( !paragraph )
		{
			buffer += line + '\n';
			
			continue;
		}
		
		if ( isTitle( buffer ) )
		{
			output += asTitle( buffer );
			buffer = line + '\n';
			
			continue;
		}
		
		output += asParagraph( buffer );
		buffer = line + '\n';
		
		if ( pause && !isTitle( line ) )
		{
			output += EMPTY_LINE;
		}
	}
	
	if ( buffer )
	{
		if ( emptyLinesCount > 1 )
		{
			output += EMPTY_LINE;
		}
		
		output += asParagraph( buffer );
	}
	
	output += '</section>';
	
	return output;
}
