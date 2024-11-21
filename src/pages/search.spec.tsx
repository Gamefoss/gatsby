import React from 'react';
import { render, screen } from '@testing-library/react';
import {mock} from "jest-mock-extended";
import "@mocks/layouts.mock";

import SearchPage from "./search";

jest.mock("@components", () => ({
	...jest.requireActual("@components"),
	SearchProvider: ({query, children}: { query: string, children: React.ReactNode}) => (
		<>
			<div data-testid="search-provider-query">{query}</div>
			{children}
		</>
	),
	SearchResults: () => <div data-testid="search-results-mock">SearchResults</div>
}))


describe("SearchPage", () => {
	it('renders search results based on query parameter', () => {
		const location = { search: '?q=test' };
		const {getByTestId} = render(
			<SearchPage
				{...mock()}
				location={mock({...location})}
				data={mock()}
				children={undefined}
			/>
		);
		expect(getByTestId("search-results-mock")).toBeInTheDocument();
		expect(getByTestId("search-provider-query")).toHaveTextContent("test");
	});
	it("renders search results with empty query", () => {
		const location = { search: '' };
		const {getByTestId} = render(
			<SearchPage
				{...mock()}
				location={mock({...location})}
				data={mock()}
				children={undefined}
			/>
		);
		expect(getByTestId("search-provider-query")).not.toHaveTextContent("test");
	});
});
