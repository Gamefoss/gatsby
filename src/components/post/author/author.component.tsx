import React, {FunctionComponent} from "react";
import "./author.component.css";
import {Link} from "gatsby";

export const Author: FunctionComponent<AuthorProps> = (props) => {
	const {
		name,
		slug,
		avatarUrl
	} = props;
	return (
		<Link
			to={`/autor/${slug}`}
			className="author-component"
		>
			<img src={avatarUrl} alt={name}/>
			<span>{name}</span>
		</Link>
	);
}
