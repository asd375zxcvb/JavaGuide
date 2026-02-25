import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const docsDirectories = [
	'about-the-author',
	'books',
	'cs-basics',
	'database',
	'distributed-system',
	'high-availability',
	'high-performance',
	'high-quality-technical-articles',
	'interview-preparation',
	'java',
	'javaguide',
	'open-source-project',
	'system-design',
	'tools',
	'zhuanlan',
] as const;

const docsPatterns = [
	'home.md',
	...docsDirectories.flatMap((directory) => [`${directory}/**/*.md`, `${directory}/**/*.mdx`]),
];

const docsFrontmatterSchema = z
	.object({
		title: z.string(),
		description: z.string().optional(),
		editUrl: z.union([z.string().url(), z.boolean()]).optional().default(true),
		head: z.any().optional().transform(() => []),
		tableOfContents: z.any().optional(),
		template: z.enum(['doc', 'splash']).default('doc'),
		hero: z.any().optional(),
		lastUpdated: z.union([z.coerce.date(), z.boolean()]).optional(),
		prev: z.any().optional(),
		next: z.any().optional(),
		sidebar: z
			.object({
				order: z.number().optional(),
				label: z.string().optional(),
				hidden: z.boolean().default(false),
				badge: z.any().optional(),
				attrs: z.record(z.union([z.string(), z.boolean(), z.undefined()])).default({}),
			})
			.default({}),
		banner: z
			.object({
				content: z.string(),
			})
			.optional(),
		pagefind: z.boolean().default(true),
		draft: z.boolean().default(false),
	})
	.passthrough();

export const collections = {
	docs: defineCollection({
		loader: glob({
			base: '.',
			pattern: docsPatterns,
			generateId: ({ entry }) => {
				const normalizedEntry = entry.replace(/\\/g, '/');
				if (normalizedEntry === 'home.md') return 'index';

				let id = normalizedEntry.replace(/\.(md|mdx)$/i, '');
				id = id.replace(/(^|\/)README$/i, '$1index');
				return id;
			},
		}),
		schema: docsFrontmatterSchema,
	}),
};
