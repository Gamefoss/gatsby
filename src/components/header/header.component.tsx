import {Link} from "gatsby";

import React, {useState} from "react";

import {
	Bars3Icon as HamburgerIcon,
	MagnifyingGlassIcon as SearchIcon,
	XMarkIcon as CloseIcon
} from "@heroicons/react/24/solid"

import {HeaderProps} from "./header.component.types";


import logo from "@images/horizontal-logo.svg";
import "./header.component.css";

/**
 * HeaderComponent component
 * @description The header component for the site
 */
const Header = ({menu = []}: HeaderProps) => {
	const [menuOpen, setMenuOpen] = useState(false);
	return (
		<header data-testid="header-component">
			<nav>
				<button
					id="menu-toggle"
					data-testid="header-menu-toggle"
					aria-label="Toggle menu"
					onClick={() => setMenuOpen(!menuOpen)}
				>
					
					{menuOpen ? <CloseIcon/> : <HamburgerIcon />}
				</button>
				<h1 id="main-logo">
					<Link to="/">
						<img src={logo} alt={"Gamefoss"}/>
					</Link>
				</h1>
				<ul
					data-testid="header-menu"
					className={menuOpen ? "menu__opened" : ""}
				>
					{
						menu?.map(({link, title}, index) => (
							<li key={`menu-item-${index}`}>
								<Link to={link}>{title}</Link>
							</li>
						))
					}
				</ul>
				<button
					id="search-toggle"
					data-testid="header-search-toggle"
					aria-label="Toggle search"
				>
					<SearchIcon />
				</button>
			</nav>
		</header>
	);
}

export {Header};
