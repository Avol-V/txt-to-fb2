import { resolve, dirname, basename, extname } from 'path';
import { writeFile } from 'fs/promises';
import { processFile } from './lib/process-file.js';
import { wrapBody } from './lib/wrap-body.js';

async function main()
{
	const fileName = process.argv[2];
	
	if ( !fileName )
	{
		throw new Error( 'Input file required' );
	}
	
	const path = resolve(
		process.cwd(),
		fileName,
	);
	
	const body = await processFile( path );
	const document = wrapBody( body );
	
	const outputPath = resolve(
		dirname( path ),
		basename( fileName, extname( fileName ) ) + '.fb2',
	);
	
	await writeFile( outputPath, document, 'utf8' );
}

main()
	.catch(
		( error ) =>
		{
			console.error( error );
			process.exit( 1 );
		}
	);
