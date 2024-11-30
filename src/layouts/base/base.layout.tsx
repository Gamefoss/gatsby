import React, {FunctionComponent, ReactNode} from "react";

import "./base.layout.css";
import {Footer, Header} from "@components";

/**
 * Base layout
 * @description The base layout for the site
 * @param children Content to render in the layout
 */
const BaseLayout: FunctionComponent<{ children: ReactNode }> = ({children}) => {
	return (
		<div className="main-grid">
			<Header menu={[
				{
					title: "Home",
					link: "/"
				},
				{
					title: "Test",
					link: "/test"
				}
			]}/>
			<main
				data-testid="main-content"
			>
				{children}
			</main>
			<Footer/>
		</div>
	)
}

export {BaseLayout};
