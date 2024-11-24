import type {PodcastRssFeedEpisode, PodcastRssFeedEpisodeData} from "gatsby-source-podcast-rss-feed";
import slugify from "slugify";
import path from "node:path";
import {CreatePageArgs} from "gatsby";

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
			const slug = slugify(item!.title as string, {
				lower: true,
				remove: /[*+~.,()'"!:@]/g
			});
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

	async create(): Promise<void> {
		const { actions, graphql } = this;
		const { data } = await graphql<any>(`
      query WpPostsAndPages {
        allWpPost(sort: { date: DESC }) {
          edges {
            post: node {
              id
              slug
            }
          }
        }
        allWpPage {
          edges {
            page: node {
              id
              slug
            }
          }
        }
      }
    `);
		
		data.allWpPost.edges.forEach((node: any) => {
			const { post } = node;
			actions.createPage({
				path: `/article/${post.slug}`,
				component: path.resolve(`./src/templates/article.template.tsx`),
				context: { id: post.id }
			});
		});
		
		data.allWpPage.edges.forEach((node: any) => {
			const { page } = node;
			actions.createPage({
				path: `/page/${page.slug}`,
				component: path.resolve(`./src/templates/page.template.tsx`),
				context: { id: page.id }
			});
		});
	}
}
