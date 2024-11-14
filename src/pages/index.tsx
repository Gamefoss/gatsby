import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { graphql } from "gatsby";

import "@styles/pages/index.css"

const IndexPage: React.FC<PageProps> = ({data}) => {
  return (
    <main>
      <h1 className={"test"}>Testing Gatsby!</h1>
      <ul>
        {data.allPodcastRssFeedEpisode.nodes.map((node) => {
          const { item } = node;
          return (
            <li key={item.link}>{item.title}</li>
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
