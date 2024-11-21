import path from "node:path";
import { GatsbyNode } from 'gatsby';

import slugify from "slugify";
import type {PodcastRssFeedEpisodeData} from "gatsby-source-podcast-rss-feed";

const createPages: GatsbyNode['createPages'] = async ({actions, graphql}) => {
	const { data } = await graphql<PodcastRssFeedEpisodeData>(`
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
	data?.allPodcastRssFeedEpisode?.nodes?.forEach((node ) => {
		const {item, id} = node || {};

		const slug = slugify(item!.title as string, {
			lower: true
		});
		actions.createPage({
			path: `/podcast/${slug}`,
			component: path.resolve(`./src/templates/podcast.template.tsx`),
			context: { id, slug },
		})
	});
}

export {createPages};
