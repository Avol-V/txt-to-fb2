/**
 * Оборачивает разметку содержимого в основные теги документа FB2
 * 
 * @param {string} body Разметка, для помещения внутрь `<body>`
 */
export function wrapBody( body )
{
	return `<?xml version="1.0" encoding="UTF-8"?>
<FictionBook xmlns="http://www.gribuser.ru/xml/fictionbook/2.0" xmlns:l="http://www.w3.org/1999/xlink">
<description>
</description>
<body>
${body}
</body>
</FictionBook>
`;
}
