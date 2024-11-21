import React, {FunctionComponent} from "react";
import {graphql, HeadFC, PageProps} from "gatsby";
import type {PodcastRssFeedEpisodeData} from "gatsby-source-podcast-rss-feed";

const PodcastTemplate: FunctionComponent<PageProps<any>> = ({data}) => {
	return (
		<div>
			<h1>Podcast Template</h1>
			<pre>
				${JSON.stringify(data, null, 2)}
			</pre>
		</div>
	);
}

export default PodcastTemplate;

export const Head: HeadFC = () => <title>PODCAST!</title>

export const query = graphql`
	query($id: String!) {
		podcastRssFeedEpisode(id: {eq: $id}) {
      item {
        title
        pubDate
      }
    }
	}
`;
