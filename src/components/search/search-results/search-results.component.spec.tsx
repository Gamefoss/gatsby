import React, {useContext} from 'react';
import { render, screen } from '@testing-library/react';
import "@mocks/react-use-flexsearch";

import { SearchProvider, SearchResults } from '@components';
import {useFlexSearch} from "react-use-flexsearch";
import {useStaticQuery} from "gatsby";

jest.mock("react", () => ({
	...jest.requireActual("react"),
	useContext: jest.fn().mockReturnValue({results: []})
}))

describe('SearchResults', () => {
	
	const results = [
		{ id: '1', title: 'Result 1', slug: null, url: '/result-1' },
		{ id: '2', title: 'Result 2', slug: '/result-2', url: null },
	];
	beforeEach(() => {
		(useStaticQuery as jest.Mock).mockReturnValue({
			localSearchPages: {
				index: 'index',
				store: 'store'
			}
		});
	});
	
	it('throws error when used outside of SearchProvider', () => {
		(useContext as jest.Mock).mockReturnValue(undefined);
		const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
		expect(() => render(<SearchResults />)).toThrow('useSearchContext must be used within a SearchProvider');
		consoleError.mockRestore();
	});
	
	it('renders search results when results are available', () => {
		(useFlexSearch as jest.Mock).mockReturnValue(results);
		(useContext as jest.Mock).mockReturnValue({results});
		const {getByText, getByTestId} = render(
			<SearchProvider query="test">
				<SearchResults />
			</SearchProvider>
		);
		expect(getByTestId('search-results-component')).toBeInTheDocument();
		expect(getByText('Result 1')).toBeInTheDocument();
		expect(getByText('Result 2')).toBeInTheDocument();
	});
	
	it('renders no results message when no results are found', () => {
		(useFlexSearch as jest.Mock).mockReturnValue([]);
		(useContext as jest.Mock).mockReturnValue({results: []});
		const {getByTestId} = render(
			<SearchProvider query="nonexistent">
				<SearchResults />
			</SearchProvider>
		);
		expect(getByTestId("search-results--no-results")).toBeInTheDocument();
	});
});
