import {BaseLayout} from "@layouts";
import {graphql, HeadFC, PageProps} from "gatsby";
import React, {FunctionComponent, useEffect, useState} from "react";
import {Post} from "@components";
import {POSTS_PER_PAGE} from "@constants";

const CategoryTemplate: FunctionComponent<PageProps<{ wpCategory: Queries.WpCategory }>> = ({data}) => {
	const {name, posts, count} = data.wpCategory;
	const total = posts?.nodes.length || 0;
	const [loadedNumber, setLoadedNumber] = useState(POSTS_PER_PAGE);
	const [loadedPosts, setPosts] = useState<Queries.WpPost[] | undefined>([]);
	
	
	useEffect(() => {
		setPosts(
			data.wpCategory.posts?.nodes.slice(0, loadedNumber) as Queries.WpPost[]
		);
	}, [loadedNumber]);
	
	const loadMore = () => {
		setLoadedNumber(loadedNumber + POSTS_PER_PAGE);
	}
	
	return (
		<BaseLayout>
			<div data-testid="category-template">
				<h1>This will be the Category: {name}</h1>
				<pre>{JSON.stringify(data, null, 2)}</pre>
				<ul>
					{
						loadedPosts?.map((post: Queries.WpPost) => {
							const {
								id,
								...othersProps
							} = post;
							return (
								<li key={id}>
									<Post
										id={id}
										{...othersProps}
									/>
								</li>
							);
						})
					}
				</ul>
				{total > loadedNumber &&
            <button
		            data-testid="category-template__load-more"
                onClick={loadMore}
            >
                Load More
            </button>
				}
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
	        featuredImage {
	          node {
	            altText
	            sourceUrl
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
