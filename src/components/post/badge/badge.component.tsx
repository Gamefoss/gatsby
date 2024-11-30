import React, {FunctionComponent} from "react";
import {clsx} from "clsx";

import "./badge.component.css";

type BadgeProps = {
	name?: string;
};

export const Badge: FunctionComponent<BadgeProps> = (props) => {
	const {name} = props;
	return (
		<span
			data-testid="badge-component"
			className={clsx(
				"badge-component",
				`badge-component--${name?.toLowerCase()}`
			)}
		>
			{name}
		</span>
	);
}
