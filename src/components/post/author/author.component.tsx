import React, {FunctionComponent} from "react";
import {navigate} from "gatsby";

import "./author.component.css";

export const Author: FunctionComponent<AuthorProps> = (props) => {
	const {
		name,
		slug,
		avatarUrl
	} = props;
	return (
		<button
			data-testid="author-component"
			onClick={(e) => {
				e.preventDefault();
				// TODO: Remove this once the navigate typings are fixed on gatsby link - https://github.com/gatsbyjs/gatsby/issues/39158
				// @ts-ignore
				navigate(`/autor/${slug}`);
			}}
			className="author-component"
		>
			<img src={avatarUrl} alt={name}/>
			<span>{name}</span>
		</button>
	);
}
