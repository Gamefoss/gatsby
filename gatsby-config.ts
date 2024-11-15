import type { GatsbyConfig } from "gatsby";
import {join} from "node:path";

import {compilerOptions} from './tsconfig.json'

const {paths} = compilerOptions;

/**
 * This will take the paths object from the tsconfig.json file and parse it into a format that
 * the gatsby-plugin-root-import plugin can use.
 */
const parsedPaths: Record<string, string> = Object.entries(paths).reduce((acc, [key, [value]]) => {
  const path = key.replace('/*', '');
  const directory = value.replace('/*', '');
  return {
  ...acc,
    [path]: join(__dirname, ...directory.split('/'))
  }
}, {});

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Gamefoss`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-postcss", "gatsby-plugin-image", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  },
  {
    resolve: `gatsby-source-podcast-rss-feed`,
    options: {
      feedURL: `https://anchor.fm/s/4c499e08/podcast/rss`,
      id: 'guid',
    },
  },
  {
    resolve: `gatsby-plugin-root-import`,
    options: parsedPaths
  }
  ]
};

export default config;
