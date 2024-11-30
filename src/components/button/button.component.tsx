import React, {FunctionComponent} from 'react';
import {clsx} from "clsx";

import "./button.component.css";

type ButtonProps = {
	onClick: () => void;
	children: React.ReactNode;
	variant?: "primary" | "secondary" | string;
	className?: string;
}
const Button: FunctionComponent<ButtonProps> = (props) => {
	const {
		children,
		onClick,
		className,
		variant = "primary"
	} = props;
	return (
		<button
			onClick={onClick}
			className={clsx(`btn`, `btn--${variant}`, className)}
		>
			{children}
		</button>
	);
}

export {Button};
