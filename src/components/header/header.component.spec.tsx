import React from "react";

import "@mocks/heroicons.mock";

import {render, fireEvent, waitFor} from "@testing-library/react";
import {Header} from "@components";
import {ANIMATION_DELAY} from "@constants";


jest.mock('@components', () => ({
	...jest.requireActual('@components'),
	SearchHeader: () => <div>Search</div>,
	Socials: () => <div>Socials</div>,
	Menu: () => <div>Menu</div>,
}));

describe("Header", () => {
	describe("Render", () => {
		it("renders logo correctly", () => {
			const { getByTestId } = render(<Header />);
			expect(getByTestId("header-component")).toBeInTheDocument();
		});
		
		it.each([
			"Search",
			"Socials",
			"Menu"
		])("Render %s at least once", (component) => {
			const { getAllByText } = render(<Header />);
			const [element] = getAllByText(component);
			expect(element).toBeInTheDocument();
		});
	});
	
	describe("Menu Toggling", () => {
		
		it("menu is closed by default", () => {
			const { queryByText } = render(<Header />);
			expect(queryByText("Close")).not.toBeInTheDocument();
		});
		
		it("toggles menu on button click", async () => {
			const { getByTestId, getByText } = render(<Header />);
			const menuButton = getByTestId("header-menu-toggle");
			
			fireEvent.click(menuButton);
			expect(getByText("Close")).toBeInTheDocument();
			fireEvent.click(menuButton);
			await waitFor(() => {
				expect(getByText("Menu")).toBeInTheDocument();
			}, {timeout: ANIMATION_DELAY + 200});
		});
	});
});
