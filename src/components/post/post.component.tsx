import React, {FunctionComponent} from "react";
import {Link, navigate} from "gatsby";
import {Author, Badge} from "@components";

import "./post.component.css";

const Image: FunctionComponent<Pick<PostProps, 'featuredImage'>> = (props) => {

	const {featuredImage} = props
	
	return (
		<div
			className="post-component__image"
		>
			{
				featuredImage && (
					<img
						src={featuredImage.sourceUrl}
						alt={featuredImage.altText}
					/>
				)
			}
		</div>
	);
}

export const Post: FunctionComponent<PostProps> = (props) => {
	const {
		slug,
		featuredImage,
		title,
		excerpt,
		type,
		author,
		categories
	} = props;
	return (
		<article
			data-testid="post-component"
			className="post-component"
		>
			<Link to={`/artigo/${slug}`}>
				<Image featuredImage={featuredImage} />
				<div className="post-component__content-wrapper">
					<div className="post-component__badge-container">
						{
							categories && categories.slice(0,4).map(({name, slug}) => (
								<button
									key={slug}
									onClick={(e) => {
										e.preventDefault();
										// TODO: Remove this once the navigate typings are fixed on gatsby link - https://github.com/gatsbyjs/gatsby/issues/39158
										// @ts-ignore
										navigate(`/categoria/${slug}`)
									}}
								>
									<Badge name={name} type={type} />
								</button>
							))
						}
						
					</div>
					<div className="post-component__content">
						<h2>{title}</h2>
						<div
							className="post-component__excerpt"
							dangerouslySetInnerHTML={{__html: excerpt}}
						/>
						<Author {...author} />
					</div>
				</div>
			</Link>
		</article>
	);
}
