import {BaseLayout} from "@layouts";
import {graphql, HeadFC, PageProps} from "gatsby";
import React, {FunctionComponent} from "react";
import {Listing} from "@components";

const CategoryTemplate: FunctionComponent<PageProps<{ wpCategory: Queries.WpCategory }>> = ({data}) => {
	const {name, posts} = data.wpCategory;
	
	const transformPosts = (posts: Queries.WpPost[]): PostProps[] => {
		return posts.map((post) => {
			const {
				id,
				title,
				slug,
				excerpt,
				featuredImage,
				nodeType,
				author
			} = post;
			const image: ImageProps | undefined = featuredImage ? {
				sourceUrl: featuredImage.node.sourceUrl as string,
				altText: featuredImage.node.altText as string
			} : undefined;
			const authorData: AuthorProps = {
				name: author?.node.name as string,
				avatarUrl: author?.node.avatar?.url as string
			};
			return {
				id,
				title,
				slug,
				excerpt,
				type: nodeType as PostType,
				featuredImage: image,
				author: authorData
			} as PostProps;
		});
	}
	
	return (
		<BaseLayout>
			<div data-testid="category-template">
				<h1>This will be the Category: {name}</h1>
				<pre>{JSON.stringify(data, null, 2)}</pre>
				<Listing posts={transformPosts(posts?.nodes as Queries.WpPost[])} />
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
			        avatar {
			          url
			        }
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
