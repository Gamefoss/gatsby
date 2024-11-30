import React, {FunctionComponent} from "react";
import {clsx} from "clsx";

import "./badge.component.css";

type BadgeProps = {
	name: string;
	type?: PostType
};

export const Badge: FunctionComponent<BadgeProps> = (props) => {
	const {name, type} = props;
	return (
		<span
			data-testid="badge-component"
			className={clsx(
				"badge-component",
				`badge-component--${type?.toLowerCase()}`
			)}
		>
			{name}
		</span>
	);
}
