import React, {FunctionComponent, useState} from "react";
import {navigate} from "gatsby";
import {clsx} from "clsx";
import {MagnifyingGlassIcon as SearchIcon} from "@heroicons/react/24/solid";

import "./search-header.component.css";

export const SearchHeader: FunctionComponent = () => {
	
	const [searchOpen, setSearchOpen] = useState(false);
	const inputRef = React.createRef<HTMLInputElement>();
	
	
	const toggleSearch = () => {
		if (inputRef.current?.value) {
			// TODO: Remove this once the navigate typings are fixed on gatsby link - https://github.com/gatsbyjs/gatsby/issues/39158
			// @ts-ignore
			navigate(`/search?q=${inputRef.current?.value}`);
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
				data-testid="header-search--input"
				ref={inputRef}
			/>
			<button
				className="search-header--button"
				data-testid="header-search--button"
				aria-label="Toggle search"
				onClick={toggleSearch}
			>
				<SearchIcon/>
			</button>
		</div>
	);
}
