import React, {FunctionComponent} from "react";
import {BaseLayout} from "@layouts";
import {graphql, HeadFC, Link, PageProps} from "gatsby";
import type {PodcastRssFeedEpisode, PodcastRssFeedEpisodeData} from "gatsby-source-podcast-rss-feed";
import slugify from "slugify";
import {SLUGIFY_OPTIONS} from "@constants";
import {Listing} from "@components";


const transformPodcastData = (data: PodcastRssFeedEpisode): PostProps => {
	const {title, itunes} = data;
	const {image, summary} = itunes;
	
	const slug = slugify(title, SLUGIFY_OPTIONS);
	
	return {
		id: slug,
		slug,
		title,
		excerpt: summary,
		type: "Podcast",
		featuredImage: {
			sourceUrl: image,
			altText: title
		},
	}
}

const PodcastPage: FunctionComponent<PageProps<PodcastRssFeedEpisodeData>> = ({data}) => {
	const posts = data.allPodcastRssFeedEpisode?.nodes?.map((node) => transformPodcastData(node?.item as PodcastRssFeedEpisode));
	return (
		<BaseLayout>
			<Listing name="PODCAST" posts={posts!}>
			</Listing>
		</BaseLayout>
	);
}

export default PodcastPage;

export const Head: HeadFC = () => {
	return (
		<>
			<title>Podcast | Gamefoss</title>
			<meta name="description" content="Gamefoss Podcast"/>
			<meta name="keywords" content="podcast, gamefoss, games, gaming"/>
			<meta name="author" content="Gamefoss Team"/>
		</>
	);
}

export const query = graphql`
  query PodcastQuery {
    allPodcastRssFeedEpisode {
      nodes {
        item {
          title
          link
          itunes {
            duration
            image
            summary
          }
        }
      }
    }
  }
`;
