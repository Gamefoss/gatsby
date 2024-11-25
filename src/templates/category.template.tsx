import { BaseLayout } from "@layouts";
import { graphql, HeadFC, PageProps } from "gatsby";
import React, { FunctionComponent } from "react";

const CategoryTemplate:FunctionComponent<PageProps<{wpCategory: Queries.WpCategory}>> = ({data}) => {
	const {name} = data.wpCategory;
	return (
		<BaseLayout>
			<h1>This will be the Category: {name}</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</BaseLayout>
	);
}

export const query = graphql`
	query($id: String!) {
		wpCategory(id: {eq: $id}) {
			name
		}
	}
`;

export const Head: HeadFC<{wpCategory: Queries.WpCategory}> = ({data}) => {
	const {name} = data.wpCategory;
	return(
		<title>{name} | Gamefoss</title>
	);
}

export default CategoryTemplate;
