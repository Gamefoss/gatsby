import React from "react";
import {FunctionComponent} from "react";
import {Link} from "gatsby";

const Image: FunctionComponent<Queries.WpPost['featuredImage']> = (props) => {
	return (
		<img
			src={props!.node.sourceUrl as string}
			alt={props!.node.altText as string}
		/>
	);
}

export const Post: FunctionComponent<Queries.WpPost> = (props) => {
	return (
		<article data-testid="post-component">
			<Link to={`/artigo/${props.slug}`}>
				{props.featuredImage && <Image {...props.featuredImage} />  }
				<h2>{props.title}</h2>
				<div dangerouslySetInnerHTML={{__html: props.excerpt as string}} />
			</Link>
		</article>
	);
}
