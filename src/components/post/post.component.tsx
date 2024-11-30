import React from "react";
import {FunctionComponent} from "react";
import {Link} from "gatsby";

const Image: FunctionComponent<ImageProps> = (props) => {
	const {sourceUrl, altText} = props;
	return (
		<img
			src={sourceUrl}
			alt={altText}
		/>
	);
}

export const Post: FunctionComponent<PostProps> = (props) => {
	const {
		slug,
		featuredImage,
		title,
		excerpt,
		type
	} = props;
	return (
		<article data-testid="post-component">
			<Link to={`/artigo/${slug}`}>
				<span>Type is: {type}</span>
				{featuredImage && <Image {...featuredImage} />}
				<h2>{title}</h2>
				<div dangerouslySetInnerHTML={{__html: excerpt}}/>
			</Link>
		</article>
	);
}
