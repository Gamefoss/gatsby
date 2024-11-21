import React, {FunctionComponent, useState, MouseEvent} from "react";
import {navigate} from "gatsby";
import {clsx} from "clsx";
import {MagnifyingGlassIcon as SearchIcon} from "@heroicons/react/24/solid";

import "./search-header.component.css";

/**
 * Search header component
 * @description This component renders a search input and button to toggle the search input visibility
 * @description It also handles the search form submission and navigation to the search page
 */
export const SearchHeader: FunctionComponent = () => {
	
	const [searchOpen, setSearchOpen] = useState(false);
	const inputRef = React.createRef<HTMLInputElement>();
	
	
	/**
	 * Handles the form submission and navigates to the search page with the query
	 */
	const onSubmit = () => {
		if (inputRef.current?.value) {
			// TODO: Remove this once the navigate typings are fixed on gatsby link - https://github.com/gatsbyjs/gatsby/issues/39158
			// @ts-ignore
			navigate(`/search?q=${inputRef.current?.value}`);
		}
	}
	
	/**
	 * Toggles the search input visibility
	 * @param event - The click event
	 */
	const toggleSearch = (event: MouseEvent) => {
		event.preventDefault();
		if (inputRef.current?.value) {
			onSubmit();
			return;
		}
		setSearchOpen(!searchOpen);
		if (searchOpen) {
			inputRef.current?.blur();
			inputRef.current!.value = "";
		} else {
			inputRef.current?.focus();
		}
	}
	
	return (
		<form
			className={
				clsx("search-header",
					{
						'search-header__open': searchOpen
					}
				)
			}
			onSubmit={onSubmit}
		>
			<input
				type="text"
				placeholder="Buscar..."
				aria-label="Search"
				className="search-header--input"
				data-testid="header-search--input"
				ref={inputRef}
			/>
			<button
				className="search-header--button"
				data-testid="header-search--button"
				aria-label="Toggle search"
				onClick={(e) => toggleSearch(e)}
			>
				<SearchIcon/>
			</button>
		</form>
	);
}
