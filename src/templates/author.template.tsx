import React, { FunctionComponent } from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import { BaseLayout } from "@layouts";

type AuthorProps = {wpUser: Queries.WpUser};
const AuthorTemplate: FunctionComponent<PageProps<AuthorProps>> = ({data}) => {
	
	return (
		<BaseLayout>
			<h1>The title should be Author page</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</BaseLayout>
	);
}

export const Head: HeadFC<AuthorProps> = ({data}) => {
	const {name} = data.wpUser;
	return(
		<title>{name} | Gamefoss</title>
	);
}

export const query = graphql`
	query($id: String!) {
  wpUser(id: { eq: $id}) {
    name
    posts {
      nodes {
        title
      }
    }
  }
}
`;

export default AuthorTemplate;
