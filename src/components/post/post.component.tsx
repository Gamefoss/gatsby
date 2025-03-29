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
								<Link key={slug} to={`/categoria/${slug}`}>
									<Badge name={name} type={type} />
								</Link>
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
