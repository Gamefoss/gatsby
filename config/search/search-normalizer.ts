import {SLUGIFY_OPTIONS} from "../../src/constants";

type PossibleSearchItem = {
	node: {
		id: string,
	} & DeepPartial<{
		title: string,
		name: string,
		slug: string,
		content: string,
		item: {
			title: string,
			link: string,
			contentSnippet: string
		}
	}>
}

type SlugifyFnOptions = (txt: string, options: Record<string, string | boolean | RegExp>) => string;

interface ISearchNormalizer {
	normalize<T extends { node: { id: string } }>(edges: Readonly<T[]>): SearchResult[];
}

export class SearchNormalizer implements ISearchNormalizer {
	
	/**
	 * The function that will handle slugification.
	 */
	private readonly slugifyFn: SlugifyFnOptions;
	
	/**
	 * Create a new instance of the SearchNormalizer.
	 * @param slugifyFn The function that will handle slugification.
	 */
	constructor(slugifyFn: SlugifyFnOptions) {
		this.slugifyFn = slugifyFn;
	}
	
	/**
	 * Create a slug from a given text.
	 * @param txt The text to create a slug from.
	 */
	private createSlug (txt: string) {
		return this.slugifyFn(txt, SLUGIFY_OPTIONS);
	}
	
	/**
	 * Normalize the search results to the required format for the search index.
	 * @param edges The edges from the GraphQL query.
	 */
	public normalize<T extends { node: { id: string } }>(edges: Readonly<T[]>): SearchResult[] {
		return edges.map(({node}: PossibleSearchItem) => {
			
			const slug = node.slug || node.item?.link || "";
			
			return {
				id: node.id,
				title: (node.title || node.name || node.item?.title) as string,
				slug,
				body: (node.content || node.item?.contentSnippet) as string
			};
		})
	}
}
