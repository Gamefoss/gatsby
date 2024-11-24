import {GatsbyNode} from 'gatsby';
import {PodcastCreator, WordPressCreator} from "./config";

/**
 * Create pages in Gatsby
 * @param actions Gatsby actions object
 * @param graphql Gatsby graphql function for Create Pages
 */
const createPages: GatsbyNode['createPages'] = async ({actions, graphql}) => {
	const podcastCreator = new PodcastCreator(actions, graphql);
	await podcastCreator.create();
	
	const wordpressCreator = new WordPressCreator(actions, graphql);
	await wordpressCreator.create();
};

export {createPages};
