import React from "react";

import "@mocks/heroicons.mock";

import {render, fireEvent} from "@testing-library/react";
import {SearchHeader} from "@components";
import {navigate} from "gatsby";

jest.mock("gatsby", () => ({
	...jest.requireActual("gatsby"),
	navigate: jest.fn(),
}));

describe("SearchHeader", () => {
	
	afterEach(() => {
		jest.clearAllMocks();
	});
	
	describe("render", () => {
		it("renders search input and button", () => {
			const { getByTestId } = render(<SearchHeader />);
			expect(getByTestId("header-search--input")).toBeInTheDocument();
			expect(getByTestId("header-search--button")).toBeInTheDocument();
		});
	});
	
	describe("onClick", () => {
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
			const { getByTestId } = render(<SearchHeader />);
			const searchButton = getByTestId("header-search--button");
			const searchInput = getByTestId("header-search--input");
			
			fireEvent.click(searchButton);
			fireEvent.change(searchInput, { target: { value: "test query" } });
			fireEvent.click(searchButton);
			
			expect(navigate).toHaveBeenCalledWith("/search?q=test query");
		});
	});
	
	describe("onSubmit", () => {
		it("submits the form and navigates to search page with query", () => {
			const { getByTestId } = render(<SearchHeader />);
			const searchButton = getByTestId("header-search--button");
			const searchInput = getByTestId("header-search--input");
			
			fireEvent.click(searchButton);
			fireEvent.change(searchInput, { target: { value: "test query" } });
			fireEvent.submit(searchInput);
			
			expect(navigate).toHaveBeenCalledWith("/search?q=test query");
		});
		
		it("does not navigate if input is empty on submit", () => {
			const { getByTestId } = render(<SearchHeader />);
			const searchButton = getByTestId("header-search--button");
			const searchInput = getByTestId("header-search--input");
			
			fireEvent.click(searchButton);
			fireEvent.submit(searchInput);
			
			expect(navigate).not.toHaveBeenCalled();
		});
	});
});
