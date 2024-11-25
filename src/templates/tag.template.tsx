import { BaseLayout } from "@layouts";
import { graphql, HeadFC, PageProps } from "gatsby";
import React, { FunctionComponent } from "react";

const TagTemplate:FunctionComponent<PageProps<{wpTag: Queries.WpTag}>> = ({data}) => {
	const {name} = data.wpTag;
	return (
		<BaseLayout>
			<h1>This will be the Tag: {name}</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</BaseLayout>
	);
}

export const query = graphql`
	query($id: String!) {
	  wpTag(id: {eq: $id}) {
	    name
	  }
	}
`;

export const Head: HeadFC<{wpTag: Queries.WpTag}> = ({data}) => {
	const {name} = data.wpTag;
	return(
		<title>{name} | Gamefoss</title>
	);
}

export default TagTemplate;
