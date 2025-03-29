import {Link} from "gatsby";

import React, {FunctionComponent, useState} from "react";
import {clsx} from "clsx";

import {Bars3Icon as HamburgerIcon, XMarkIcon as CloseIcon} from "@heroicons/react/24/solid"
import {ANIMATION_DELAY} from "@constants";
import {Socials, SearchHeader, Menu} from "@components";

import logo from "@images/horizontal-logo.svg";
import "./header.component.css";

type MenuItem = {
	title: string;
	link: string;
}

type HeaderProps = {
	menu?: MenuItem[];
}

/**
 * HeaderComponent component
 * @description The header component for the site
 */
const Header: FunctionComponent<HeaderProps> = ({menu = []}) => {
	
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
			id="header"
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
					<Menu
						location={"header-menu"}
						classNames="header-menu--items"
					/>
					<Socials/>
				</div>
				<div className="header-menu--right">
					<SearchHeader />
					<Socials size={30}/>
				</div>
			</nav>
		</header>
	);
}

export {Header};
