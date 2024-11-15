import React, {FunctionComponent} from "react"
import type {HeadFC, PageProps} from "gatsby"
import {graphql} from "gatsby";

import type {PodcastRssFeedEpisodeData} from "gatsby-source-podcast-rss-feed";

import "@styles/pages/index.css"

const IndexPage: FunctionComponent<PageProps<PodcastRssFeedEpisodeData>> = ({data}) => {
  return (
    <main>
      <h1 className={"test"}>Testing Gatsby!</h1>
      <ul>
        {data.allPodcastRssFeedEpisode?.nodes?.map((node) => {
          const {link, title} = node?.item || {};
          return (
            <li key={link}>{title}</li>
            )
          })}
      </ul>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>

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
