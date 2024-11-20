import React, {FunctionComponent} from "react";
import {BaseLayout} from "@layouts";
import {PageProps} from "gatsby";
import {SearchProvider, SearchResults} from "@components";


const SearchPage: FunctionComponent<PageProps> = ({ location}) => {
	const {search} = location;
	const queryParams = new URLSearchParams(search);
	const searchQuery = queryParams.get("q") || "";
	
	return (
		<BaseLayout>
			<SearchProvider query={searchQuery}>
				<SearchResults />
			</SearchProvider>
		</BaseLayout>
	);
}

export default SearchPage;
