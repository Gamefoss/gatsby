import type {GatsbyConfig} from "gatsby";
import {join} from "node:path";

import {compilerOptions} from './tsconfig.json'
import {SearchConfig} from "./config";

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
		siteUrl: `https://www.gamefoss.com.br`
	},
	// More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
	// If you use VSCode you can also use the GraphQL plugin
	// Learn more at: https://gatsby.dev/graphql-typegen
	graphqlTypegen: true,
	plugins: [
		"gatsby-plugin-sitemap",
		"gatsby-plugin-postcss",
		"gatsby-plugin-image",
		"gatsby-transformer-remark",
		"gatsby-plugin-mdx",
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-root-import`,
      options: parsedPaths
    },
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				"icon": `${__dirname}/src/images/icon.png`
			}
		},
    {
			resolve: 'gatsby-source-filesystem',
			options: {
				"name": "images",
				"path": `${__dirname}/src/images/`
			},
			__key: "images"
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				"name": "pages",
				"path": `${__dirname}/src/pages/`
			},
			__key: "pages"
		},
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: {prefixes: [`/search/*`]},
    },
		{
			resolve: `gatsby-source-podcast-rss-feed`,
			options: {
				feedURL: `https://anchor.fm/s/4c499e08/podcast/rss`,
				id: 'guid',
			},
		},
		{
			resolve: `gatsby-source-wordpress`,
			options: {
				url: `https://gamefoss.com.br/cms/graphql`
			}
		},
		SearchConfig
	]
};

export default config;
