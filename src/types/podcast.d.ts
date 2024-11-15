declare module 'gatsby-source-podcast-rss-feed' {
	
	/**
	 * Types for the podcast RSS feed
	 */
	type PodcastRssFeedEpisode = {
		title: string; // Title of the episode
		link: string; // Link to the episode
		dc_creator: string; // Creator of the episode
		pubDate: string; // Publication date of the episode
		enclosure: { // Enclosure data
			url: string; // URL of the episode
			type: string; // Type of the episode
			length: string; // Length of the episode
		};
		itunes: { // iTunes specific data
			duration: string; // Duration of the episode
			image: string; // Image for the episode
			summary: string; // Summary of the episode
			explicit: string; // Explicit content
			episodeType: string; // Type of the episode
		};
	};
	
	/**
	 * Data for the podcast RSS feed
	 */
	export type PodcastRssFeedEpisodeData = DeepPartial<{
		allPodcastRssFeedEpisode: {
			nodes: { item: PodcastRssFeedEpisode }[];
		}
	}>;
}
