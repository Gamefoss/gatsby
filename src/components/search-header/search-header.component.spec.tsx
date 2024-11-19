import React from "react";
import {render, fireEvent} from "@testing-library/react";
import {SearchHeader} from "@components";
import {navigate} from "gatsby";

jest.mock("gatsby", () => ({
	...jest.requireActual("gatsby"),
	navigate: jest.fn(),
}));

jest.mock("@heroicons/react/24/solid", () =>({
	MagnifyingGlassIcon: () => <div data-testid="search-icon" />,
}));

describe("SearchHeader", () => {
	it("renders search input and button", () => {
		const { getByTestId } = render(<SearchHeader />);
		expect(getByTestId("header-search--input")).toBeInTheDocument();
		expect(getByTestId("header-search--button")).toBeInTheDocument();
	});
	
	it("toggles search input visibility on button click", () => {
		const { getByTestId } = render(<SearchHeader />);
		const searchButton = getByTestId("header-search--button");
		const searchInput = getByTestId("header-search--input");
		
		fireEvent.click(searchButton);
		expect(searchInput).toHaveFocus();
		
		fireEvent.click(searchButton);
		expect(searchInput).not.toHaveFocus();
	});
	
	it("navigates to search page with query on input value", () => {
		const { getByTestId, getByPlaceholderText } = render(<SearchHeader />);
		const searchButton = getByTestId("header-search--button");
		const searchInput = getByPlaceholderText("Search...");
		
		fireEvent.click(searchButton);
		fireEvent.change(searchInput, { target: { value: "test query" } });
		fireEvent.click(searchButton);
		
		expect(navigate).toHaveBeenCalledWith("/search?q=test query");
	});
});
