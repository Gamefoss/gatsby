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
	
	// const variantClass = variant === "primary" ? "btn--primary" : "btn--secondary";
	const variantClass = {
		primary: "btn--primary",
		secondary: "btn--secondary"
	}[variant] || `btn--${variant}`;
	
	return (
		<button
			onClick={onClick}
			className={clsx(`btn`, variantClass, className)}
		>
			{children}
		</button>
	);
}

export {Button};
