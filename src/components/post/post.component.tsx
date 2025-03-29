import React, {FunctionComponent, ReactNode} from "react";
import {Link} from "gatsby";
import {Author, Badge} from "@components";
import {clsx} from "clsx";
import sanitizeHtml from "sanitize-html";

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
	
	const sanitizedExcerpt = sanitizeHtml(excerpt, {
		allowedTags: ['b', 'i', 'em', 'strong'],
		/* allowedAttributes: {
			'a': ['href', 'title'],
		} */
	});
	
	const variant: Record<PostType, string> | string = {
		Post: "post-component--post",
		Page: "post-component--page",
		Podcast: "post-component--podcast",
		Category: "post-component--category",
		Tag: "post-component--tag",
	}[type] || "post-component--post";

	const path = {
		Page: "pagina",
		Podcast: "podcast",
		Category: "categoria",
		Tag: "tag",
	}[type] || "artigo";
	
	return (
		<Link to={`/${path}/${slug}`}>
			<article
				data-testid="post-component"
				className={clsx(
					"post-component",
					"post-component--flex",
					variant
				)}
			>
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
							dangerouslySetInnerHTML={{__html: sanitizedExcerpt}}
						/>
						{author && <Author {...author} />}
					</div>
				</div>
			</article>
		</Link>
	);
}
