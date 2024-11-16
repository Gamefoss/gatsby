import {Link} from "gatsby";

import React, {FunctionComponent, useState} from "react";
import {clsx} from "clsx";

import {
	Bars3Icon as HamburgerIcon,
	MagnifyingGlassIcon as SearchIcon,
	XMarkIcon as CloseIcon
} from "@heroicons/react/24/solid"

import {HeaderProps} from "./header.component.types";


import logo from "@images/horizontal-logo.svg";
import {ANIMATION_DELAY} from "@constants";
import {Socials} from "../socials/socials.component";

import "./header.component.css";

const SearchHeader: FunctionComponent = () => {
	const [searchOpen, setSearchOpen] = useState(false);
	return (
		<div
			className={
				clsx("search-header",
					{
						'search-header__open': searchOpen
					}
				)
			}
		>
			<input
				type="text"
				placeholder="Search..."
				aria-label="Search"
				className="search-header--input"
			/>
			<button
				className="search-header--button"
				data-testid="header-search-toggle"
				aria-label="Toggle search"
				onClick={() => setSearchOpen(!searchOpen)}
			>
				<SearchIcon/>
			</button>
		</div>
	);
}


/**
 * HeaderComponent component
 * @description The header component for the site
 */
const Header: FunctionComponent = ({menu = []}: HeaderProps) => {
	
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
			<div
				className="overlay"
				onClick={toggleMenu}
			>&nbsp;</div>
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
				<div
					data-testid="header-menu"
					className="header-menu"
				>
					<ul className="header-menu--items">
						{
							menu?.map(({link, title}, index) => (
								<li key={`menu-item-${index}`}>
									<Link to={link}>{title}</Link>
								</li>
							))
						}
					</ul>
					<Socials/>
				</div>
				<div className={"header-menu--right"}>
					<SearchHeader />
					<Socials size={30}/>
				</div>
			</nav>
		</header>
	);
}

export {Header};
