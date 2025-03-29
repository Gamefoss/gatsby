import React, {FunctionComponent} from "react"
import type {HeadFC, PageProps} from "gatsby"
import {graphql} from "gatsby";

import type {PodcastRssFeedEpisode, PodcastRssFeedEpisodeData} from "gatsby-source-podcast-rss-feed";

import {BaseLayout} from "@layouts";

const IndexPage: FunctionComponent<PageProps<PodcastRssFeedEpisodeData>> = ({data}) => {
  return (
    <BaseLayout>
      <ul>
        {data.allPodcastRssFeedEpisode?.nodes?.map((node) => {
          const {link, title} = node?.item as PodcastRssFeedEpisode;
          return (
            <li key={link}>{title}</li>
          )
        })}
      </ul>
    </BaseLayout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page | Gamefoss</title>

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
