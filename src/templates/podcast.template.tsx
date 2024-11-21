import React, {FunctionComponent} from "react";
import {graphql, HeadFC, PageProps} from "gatsby";
import AudioPlayer from "react-h5-audio-player";
import { BaseLayout } from "@layouts";

import 'react-h5-audio-player/lib/styles.css';

const PodcastTemplate: FunctionComponent<PageProps<any>> = ({data}) => {
	const {enclosure} = data.podcastRssFeedEpisode.item;
	const {url: mediaUrl} = enclosure;
	return (
		<BaseLayout>
			<div>
				<h1>Podcast Template</h1>
				<pre>
					${JSON.stringify(data, null, 2)}
				</pre>
				<AudioPlayer
					src={mediaUrl}
				/>
			</div>
		</BaseLayout>
	);
}

export default PodcastTemplate;

export const Head: HeadFC = () => <title>PODCAST!</title>

export const query = graphql`
	query($id: String!) {
		podcastRssFeedEpisode(id: {eq: $id}) {
			item {
				title
				isoDate
				link
				content
				enclosure {
					url
					length
				}
				itunes {
					image
					
				}
			}
		}
	}
`;
