import React, {FunctionComponent, useContext} from "react";
import {useFlexSearch} from "react-use-flexsearch";
import {graphql, useStaticQuery} from "gatsby";


/**
 * @description This Context is used to provide search results to the children components.
 */
const SearchContext = React.createContext<{results: any[]}>({results: []});

/**
 * @description This Provider is used to provide search results to the children components.
 * @param query The search query
 * @param children The children components
 */
const SearchProvider: FunctionComponent<{ query: string, children?: React.ReactNode}> = ({query, children}) => {
	const data = useStaticQuery<Queries.Query>(graphql`
		{
		  localSearchPages {
		    index
		    store
		  }
		}
	`);
	const index = data!.localSearchPages!.index;
	const store = data!.localSearchPages!.store;
	
	const results = useFlexSearch(query, index, store);
	
	return (
		<SearchContext.Provider value={{results}}>
			{children}
		</SearchContext.Provider>
	);
}

/**
 * @description This hook is used to get the search results from the context.
 * @description Must be used within a <SearchProvider />
 */
const useSearchContext = () => {
	const context = useContext(SearchContext);
	if (!context) {
		throw new Error("useSearchContext must be used within a SearchProvider");
	}
	return context;
}

/**
 * @description This component is used to display the search results.
 */
const SearchResults: FunctionComponent = () => {
	const {results} = useSearchContext();
	return (
		<>
			{
				(results.length) ?
					(
						<ul
							data-testid="search-results-component"
						>
							{results.map((result: any) => (
								<li key={result.id}>
									<a
										href={`/${result.slug}`}
									>{result.title}</a>
								</li>
							))}
						</ul>
					) :
					(<p data-testid="search-results--no-results">No results found</p>)
			}
		</>
		
		
	);
}
export {SearchProvider, SearchResults};
