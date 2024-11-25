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
			const { getByTestId } = render(<Header />);
			const menuButton = getByTestId("header-menu-toggle");
			
			// Initial state
			expect(getByTestId("header-menu-toggle")).toBeInTheDocument();
			
			// Open menu
			fireEvent.click(menuButton);
			expect(getByTestId("header-menu-toggle").textContent).toContain("Close");
			expect(getByTestId('header-component')).toHaveClass('menu__open');
			expect(getByTestId('header-component')).toHaveClass('menu__opened');
			
			// Close menu
			fireEvent.click(menuButton);
			await waitFor(() => {
				expect(getByTestId("header-menu-toggle").textContent).toContain("Menu");
				expect(getByTestId('header-component')).not.toHaveClass('menu__open');
				expect(getByTestId('header-component')).not.toHaveClass('menu__opened');
			}, { timeout: ANIMATION_DELAY + 200 });
		});
	});
});
