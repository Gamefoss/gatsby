import { BaseLayout } from "@layouts";
import { graphql, HeadFC, PageProps } from "gatsby";
import React, { FunctionComponent } from "react";

const ArticleTemplate: FunctionComponent<PageProps<{wpPost: Queries.WpPost}>> = ({data}) => {
	console.log('data', data);
	const {title} = data.wpPost;
	
	return (
		<BaseLayout>
			<h1>The title should be: {title}</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</BaseLayout>
	);
}

export const Head: HeadFC<{wpPost: Queries.WpPost}> = ({data}) => {
	const {title} = data.wpPost;
	return(
		<title>{title} | Gamefoss</title>
	);
}

export const query = graphql`
	query($id: String!) {
		wpPost(id: {eq: $id}) {
			
			title
			date
			excerpt
			content
			
			author {
				node {
					firstName
					lastName
					username
					url
					avatar {
						url
					}
				}
			}
		}
	}
`;

export default ArticleTemplate;