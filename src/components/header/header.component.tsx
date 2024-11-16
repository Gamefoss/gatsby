import {Link} from "gatsby";

import React, {useState} from "react";
import {clsx} from "clsx";

import {
	Bars3Icon as HamburgerIcon,
	MagnifyingGlassIcon as SearchIcon,
	XMarkIcon as CloseIcon
} from "@heroicons/react/24/solid"

import {HeaderProps} from "./header.component.types";


import logo from "@images/horizontal-logo.svg";
import "./header.component.css";
import {ANIMATION_DELAY} from "@constants";

/**
 * HeaderComponent component
 * @description The header component for the site
 */
const Header = ({menu = []}: HeaderProps) => {
	
	const [menuOpen, setMenuOpen] = useState(false);
	const [menuOpened, setMenuOpened] = useState(false);
	
	const toggleMenu = () => {
		if (menuOpen) {
			setMenuOpened(false);
			setTimeout(() => {
				setMenuOpen(false);
			}, ANIMATION_DELAY);
		} else {
			setMenuOpen(true);
			setMenuOpened(true);
		}
	};
	
	return (
		<header
			data-testid="header-component"
			className={clsx({
				'menu__open': menuOpen,
				'menu__opened': menuOpened
			})}
		>
			<div className="overlay">&nbsp;</div>
			<nav className="site-wrapper">
				<button
					id="menu-toggle"
					data-testid="header-menu-toggle"
					aria-label="Toggle menu"
					onClick={toggleMenu}
				>
					
					{menuOpen ? <CloseIcon/> : <HamburgerIcon/>}
				</button>
				<h1 id="main-logo">
					<Link to="/">
						<img src={logo} alt={"Gamefoss"}/>
					</Link>
				</h1>
				<ul
					data-testid="header-menu"
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
					<SearchIcon/>
				</button>
			</nav>
		</header>
	);
}

export {Header};
