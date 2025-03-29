import React, {FunctionComponent} from "react";
import {BaseLayout} from "@layouts";
import {graphql, HeadFC, Link, PageProps} from "gatsby";
import type {PodcastRssFeedEpisode, PodcastRssFeedEpisodeData} from "gatsby-source-podcast-rss-feed";
import slugify from "slugify";
import {SLUGIFY_OPTIONS} from "@constants";

const PodcastPage: FunctionComponent<PageProps<PodcastRssFeedEpisodeData>> = ({data}) => {
	return (
		<BaseLayout>
			<h1>This will be the Podcast page</h1>
			<p>We are working on it!</p>
			<ul>
				{data.allPodcastRssFeedEpisode?.nodes?.map((node) => {
					const {link, title} = node?.item as PodcastRssFeedEpisode;
					return (
						<li key={link}>
							<Link to={`${slugify(title, SLUGIFY_OPTIONS)}`}>{title}</Link>
						</li>
					)
				})}
			</ul>
		</BaseLayout>
	);
}

export default PodcastPage;

export const Head: HeadFC = () => {
	return (
		<>
			<title>Podcast | Gamefoss</title>
			<meta name="description" content="Gamefoss Podcast" />
			<meta name="keywords" content="podcast, gamefoss, games, gaming" />
			<meta name="author" content="Gamefoss Team" />
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
