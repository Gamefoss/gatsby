import React, {FunctionComponent} from "react";
import {Link} from "gatsby";

import "./author.component.css";

export const Author: FunctionComponent<AuthorProps> = (props) => {
	const {
		name,
		slug,
		avatarUrl
	} = props;
	return (
		<>
			<Link
				to={`/autor/${slug}`}
				data-testid="author-component"
				className="author-component"
			>
				<img src={avatarUrl} alt={name}/>
				<span>{name}</span>
			</Link>
		</>
	);
}
