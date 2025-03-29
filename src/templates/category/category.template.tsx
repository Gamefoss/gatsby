import {BaseLayout} from "@layouts";
import {graphql, HeadFC, PageProps} from "gatsby";
import React, {FunctionComponent} from "react";
import {Listing} from "@components";
import {PostNormalizer} from "@normalizers";

const CategoryTemplate: FunctionComponent<PageProps<{ wpCategory: Queries.WpCategory }>> = ({data}) => {
	const {name, posts} = data.wpCategory;
	
	const normalizedPosts = PostNormalizer.normalizeList(posts?.nodes as Queries.WpPost[]);
	
	return (
		<BaseLayout>
			<div data-testid="category-template">
				<Listing
					name={name as string}
					posts={normalizedPosts}
				/>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</div>
		</BaseLayout>
	);
}

export const query = graphql`
	query ($id: String!) {
	  wpCategory(id: {eq: $id}) {
	    name
	    posts {
	      nodes {
	        id
	        title
	        slug
	        excerpt
	        nodeType
	        featuredImage {
	          node {
	            altText
	            sourceUrl
	          }
	        }
	        author {
			      node {
			        name
			        slug
			        avatar {
			          url
			        }
			      }
			    }
			    categories {
			      nodes {
			        name
			        slug
			      }
			    }
	      }
	    }
	  }
	}
`;

export const Head: HeadFC<{ wpCategory: Queries.WpCategory }> = ({data}) => {
	const {name} = data.wpCategory;
	return (
		<title>{name} | Gamefoss</title>
	);
}

export default CategoryTemplate;
