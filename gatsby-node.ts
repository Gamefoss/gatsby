import path from "node:path";
import { CreatePageArgs, GatsbyNode, graphql } from 'gatsby';

import slugify from "slugify";
import type {PodcastRssFeedEpisodeData} from "gatsby-source-podcast-rss-feed";

const createPages: GatsbyNode['createPages'] = async ({actions, graphql}) => {
	// PODCASTS
	const { data: podcastData } = await graphql<PodcastRssFeedEpisodeData>(`
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
		const {item, id} = node || {};

		const slug = slugify(item!.title as string, {
			lower: true,
			remove: /[*+~.,()'"!:@]/g
		});
		actions.createPage({
			path: `/podcast/${slug}`,
			component: path.resolve(`./src/templates/podcast.template.tsx`),
			context: { id, slug },
		})
	});

	// WP - Posts
	const { data: wpPosts } = await graphql<any>(`
		query WpPosts {
			# Query all WordPress blog posts sorted by date
			allWpPost(sort: { date: DESC }) {
				edges {
					# note: this is a GraphQL alias. It renames "node" to "post" for this query
					# We're doing this because this "node" is a post! It makes our code more readable further down the line.
					post: node {
						id
						uri
					}
				}
			}
		}
  	`);
	
	wpPosts.allWpPost.edges.forEach((node: any) => {
		const { post } = node;
		actions.createPage({
			path: `/article${post.uri}`,
			component: path.resolve(`./src/templates/article.template.tsx`),
			context: {
				id: post.id
			}
		})		
	});

	// WP - Pages
	const {data: wpPages} = await graphql<any>(`
		query WpPages {
			allWpPage {
				edges {
					page: node {
						id
						uri
					}
				}
			}
		}
	`);

	wpPages.allWpPage.edges.forEach((node:any) => {
		const {page} = node;
		actions.createPage({
			path: `/page${page.uri}`,
			component: path.resolve(`./src/templates/page.template.tsx`),
			context: {
				id: page.id
			}
		})
	});

}

export {createPages};
