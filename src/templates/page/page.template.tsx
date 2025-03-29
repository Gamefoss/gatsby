import { BaseLayout } from "@layouts";
import { graphql, HeadFC, PageProps } from "gatsby";
import React, { FunctionComponent } from "react";

const PageTemplate:FunctionComponent<PageProps<{wpPage: Queries.WpPage}>> = ({data}) => {
	const {title} = data.wpPage;
	return (
		<BaseLayout>
			<h1>This will be the page: {title}</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</BaseLayout>
	);
}

export const query = graphql`
	query($id: String!) {
		wpPage(id: {eq: $id}) {
			title
			content
		}
	}
`;

export const Head: HeadFC<{wpPage: Queries.WpPage}> = ({data}) => {
	const {title} = data.wpPage;
	return(
		<title>{title} | Gamefoss</title>
	);
}

export default PageTemplate;