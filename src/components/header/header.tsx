import {Link} from "gatsby";

import React, {useState} from "react";

import logo from "@images/horizontal-logo.svg";
import "./header.css";

/**
 * Header component
 * @description The header component for the site
 */
const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	return (
		<header>
			<nav>
				<button
					id="menu-toggle"
					aria-label="Toggle menu"
					onClick={() => setMenuOpen(!menuOpen)}
				>
					{menuOpen ? "Close" : "Menu"}
				</button>
				<h1 id="main-logo">
					<Link to="/">
						<img src={logo} alt={"Gamefoss"}/>
					</Link>
				</h1>
				<ul className={menuOpen ? "menu__opened" : ""}>
					<li>
						<Link to={"/"}>Home</Link>
					</li>
					<li>
						<Link to={"/"}>Test</Link>
					</li>
				</ul>
				<button id="search-toggle" aria-label="Toggle search">
					Search
				</button>
			</nav>
		</header>
	);
}

export {Header};
