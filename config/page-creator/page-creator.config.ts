import type {PodcastRssFeedEpisode, PodcastRssFeedEpisodeData} from "gatsby-source-podcast-rss-feed";
import slugify from "slugify";
import path from "node:path";
import {CreatePageArgs} from "gatsby";
import {SLUGIFY_OPTIONS} from "../../src/constants";

type GraphqlType = <T>(query: string) => Promise<{ errors?: any, data?: T | undefined }>;

interface ICreator {
	actions: CreatePageArgs['actions'];
	graphql: GraphqlType;
	create: () => Promise<void>;
}

/**
 * Abstract class for creating pages
 * @abstract
 */
abstract class Creator implements ICreator {
	/**
	 * Inject Gatsby actions and graphql function as dependencies for creating pages
	 * @param actions Gatsby actions object
	 * @param graphql Gatsby graphql function for Create Pages
	 */
	constructor(public actions: CreatePageArgs['actions'], public graphql: GraphqlType) {
		this.actions = actions;
		this.graphql = graphql;
	}
	
	/**
	 * Abstract method to create pages
	 * Each subclass should implement its own way to create pages
	 */
	abstract create(): Promise<void>;
}

/**
 * Query Spotify / Anchor API to get podcast episodes
 */
export class PodcastCreator extends Creator {
	async create() {
		const {actions, graphql} = this;
		const {data: podcastData} = await graphql<PodcastRssFeedEpisodeData>(`
	    query PodcastGenerationQuery {
	      allPodcastRssFeedEpisode {
	        nodes {
	          id
	          item {
	            title
	          }
	        }
	      }
	    }
  `);
		
		podcastData?.allPodcastRssFeedEpisode?.nodes?.forEach((node) => {
			const {item, id} = node as { item: PodcastRssFeedEpisode, id: string };
			const slug = slugify(item!.title, SLUGIFY_OPTIONS);
			actions.createPage({
				path: `/podcast/${slug}`,
				component: path.resolve(`./src/templates/podcast.template.tsx`),
				context: {id, slug},
			});
		});
	}
}

/**
 * Query WordPress API to get Posts and Pages
 */
export class WordPressCreator extends Creator {
	
	private createFromEdge<T extends { node: { id: string, slug: Queries.Maybe<string> } }>(
		{
			edges,
			prePath,
			template
		}: {
			edges?: ReadonlyArray<T>
			prePath: string,
			template: string
		}
	) {
		const {actions} = this;
		edges?.forEach(({node}) => {
			const {id, slug} = node;
			actions.createPage({
				path: `/${prePath}/${slug}`,
				component: path.resolve(`./src/templates/${template}`),
				context: {id}
			});
		});
	}
	
	async create(): Promise<void> {
		const {graphql} = this;
		const {data} = await graphql<Queries.Query>(`
      query WpPostsAndPages {
			  allWpPost(sort: {date: DESC}) {
			    edges {
			      node {
			        id
			        slug
			      }
			    }
			  }
			  allWpPage {
			    edges {
			      node {
			        id
			        slug
			      }
			    }
			  }
			  allWpCategory {
			    edges {
			      node {
			        id
			        slug
			      }
			    }
			  }
			  allWpTag {
			    edges {
			      node {
			        id
			        slug
			      }
			    }
			  }
			}
    `);
		
		this.createFromEdge<Queries.WpPostEdge>({
			edges: data?.allWpPost.edges,
			prePath: 'artigo',
			template: 'article.template.tsx'
		});
		
		this.createFromEdge<Queries.WpPageEdge>({
			edges: data?.allWpPage.edges,
			prePath: 'pagina',
			template: 'page.template.tsx'
		});
		
		this.createFromEdge<Queries.WpCategoryEdge>({
			edges: data?.allWpCategory.edges,
			prePath: 'categoria',
			template: 'category.template.tsx'
		})
		
		this.createFromEdge<Queries.WpTagEdge>({
			edges: data?.allWpTag.edges,
			prePath: 'tag',
			template: 'tag.template.tsx'
		})
	}
}
