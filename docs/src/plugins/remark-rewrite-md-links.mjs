function rewriteMarkdownUrl(url) {
	if (typeof url !== 'string' || url.length === 0) return url;
	if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\/)/i.test(url)) return url;

	const [pathAndQuery, hash = ''] = url.split('#', 2);
	const [path, query = ''] = pathAndQuery.split('?', 2);
	if (!/\.(md|mdx)$/i.test(path)) return url;

	let rewrittenPath = path.replace(/\.(md|mdx)$/i, '');
	rewrittenPath = rewrittenPath.replace(/(^|\/)README$/i, '$1index');
	rewrittenPath = rewrittenPath.replace(/(^|\/)home$/i, '$1index');
	rewrittenPath = rewrittenPath.replace(/\/index$/i, '/');

	if (rewrittenPath === 'index') rewrittenPath = '.';
	if (rewrittenPath.length === 0) rewrittenPath = '.';

	const querySuffix = query ? `?${query}` : '';
	const hashSuffix = hash ? `#${hash}` : '';
	return `${rewrittenPath}${querySuffix}${hashSuffix}`;
}

function visit(node, visitor) {
	if (!node || typeof node !== 'object') return;

	visitor(node);

	if (Array.isArray(node.children)) {
		for (const child of node.children) {
			visit(child, visitor);
		}
	}
}

export default function remarkRewriteMdLinks() {
	return (tree) => {
		visit(tree, (node) => {
			if (node.type === 'link' || node.type === 'definition') {
				node.url = rewriteMarkdownUrl(node.url);
			}
		});
	};
}
