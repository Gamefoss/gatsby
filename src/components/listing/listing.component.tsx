import React, { FunctionComponent, useEffect, useState } from "react";
import { POSTS_PER_PAGE } from "@constants";
import { Post, Button } from "@components";

import "./listing.component.css";

export type ListingProps = {
	name: string;
	posts: PostProps[];
};

const ListingHeader: FunctionComponent<ListingProps> = (props) => {
	const {
		name,
		posts
	} = props;

	const imagesURLs = posts
		.filter(({ featuredImage }) => featuredImage)
		.map(({ featuredImage }) => (featuredImage!.sourceUrl));

	const randomImage = imagesURLs[Math.floor(Math.random() * imagesURLs.length)];
	return (
		<div
			className="listing-component__header"
		>
			<div
				style={{
					backgroundImage: `url(${randomImage})`
				}}
				data-testid="listing-component__header__image"
				className="listing-component__header__image"
				aria-hidden
			/>
			<div
				className="site-wrapper listing-component__header__content"
			>
				<h1>{name}</h1>
			</div>
		</div>
	);
};

const Listing: FunctionComponent<ListingProps> = (props) => {
	const {
		posts
	} = props;
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
			className="listing-component__list"
		>{loadedPosts.map((post) => {
			const {
				id
			} = post;
			return (
				<li key={id}>
					<Post {...post} />
				</li>
			);
		})}
		</ul>
	);

	const LoadMore = () => (
		<>
			{total > loadedNumber &&
				<Button
					data-testid="listing-component__load-more"
					onClick={loadMore}
					className="listing-component__load-more"
				>
					Carregar Mais...
				</Button>
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
			<NoPosts />
		);
	}

	return (
		<div
			data-testid="listing-component"
			className="listing-component"
		>
			<ListingHeader {...props} />
			<div className="site-wrapper">
				<List />
			</div>
			<LoadMore />
		</div>
	);
}

export { Listing };
