import React, {FunctionComponent} from "react";
import "./author.component.css";

export const Author: FunctionComponent<AuthorProps> = (props) => {
	const {name, avatarUrl} = props;
	return (
		<div
			className="author-component"
		>
			<img src={avatarUrl} alt={name}/>
			<span>{name}</span>
		</div>
	);
}
