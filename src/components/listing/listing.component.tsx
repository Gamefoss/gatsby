import React, {FunctionComponent, useEffect, useState} from "react";
import {POSTS_PER_PAGE} from "@constants";
import {Post} from "@components";

import "./listing.component.css";

const Listing: FunctionComponent<{ posts: PostProps[] }> = ({posts}) => {
	
	const total = posts.length;
	const [loadedNumber, setLoadedNumber] = useState(POSTS_PER_PAGE);
	const [loadedPosts, setPosts] = useState<PostProps[]>([]);
	
	useEffect(() => {
		setPosts(
			posts.slice(0, loadedNumber)
		);
	}, [loadedNumber]);
	
	const loadMore = () => {
		setLoadedNumber(loadedNumber + POSTS_PER_PAGE);
	};
	
	
	const List = () => (
		<ul
			data-testid="listing-component"
			className="listing-component"
		>{loadedPosts.map((post) => {
			const {
				id
			} = post;
			return (
				<li key={id}>
					<Post {...post} />
				</li>
			);
		})}</ul>
	);
	
	const LoadMore = () => (
		<>
			{total > loadedNumber &&
          <button
              data-testid="listing-component__load-more"
              onClick={loadMore}
          >
              Load More
          </button>
			}
		</>
	);
	
	const NoPosts = () => (
		<div data-testid="listing-component__no-posts">
			<p>There is no posts to show!</p>
		</div>
	);
	
	if (total === 0) {
		return (
			<NoPosts/>
		);
	}
	
	return (
		<>
			<List/>
			<LoadMore/>
		</>
	);
}

export {Listing};
