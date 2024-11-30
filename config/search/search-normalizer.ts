import {slugTransform} from "./search-normalizer.decorator";

type PossibleSearchItem = {
	node: {
		id: string,
	} & DeepPartial<{
		title: string,
		name: string,
		slug: string,
		content: string,
		description: string,
		nodeType: 'Post' | 'Page' | 'Category' | 'Tag',
		item: {
			title: string,
			link: string,
			contentSnippet: string
		}
	}>
}

interface ISearchNormalizer {
	normalize<T extends { node: { id: string } }>(edges: Readonly<T[]>): SearchResult[];
}

export class SearchNormalizer implements ISearchNormalizer {
	/**
	 * Normalize the search results to the required format for the search index.
	 * @param edges The edges from the GraphQL query.
	 */
	@slugTransform
	public normalize<T extends { node: { id: string } }>(edges: Readonly<T[]>): SearchResult[] {
		return edges.map(({node}: PossibleSearchItem) => ({
			id: node.id,
			title: (node.title || node.name || node.item?.title) as string,
			slug: node?.slug as string,
			body: (node.content || node.description || node.item?.contentSnippet) as string,
			type: (node.item) ? 'Podcast' : node.nodeType
		}));
	}
}
