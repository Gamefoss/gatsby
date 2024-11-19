import React from "react";
import {render, fireEvent, waitFor} from "@testing-library/react";
import {Header} from "@components";
import {ANIMATION_DELAY} from "@constants";

jest.mock('@heroicons/react/24/solid', () => ({
	Bars3Icon: () => <div>Menu</div>,
	XMarkIcon: () => <div>Close</div>,
	MagnifyingGlassIcon: () => <div>Search</div>,
}));

jest.mock('@components', () => ({
	...jest.requireActual('@components'),
	SearchHeader: () => <div>Search</div>,
	Socials: () => <div>Socials</div>,
}));

describe("Header", () => {
	describe("Render", () => {
		it("renders logo correctly", () => {
			const { getByTestId } = render(<Header />);
			expect(getByTestId("header-component")).toBeInTheDocument();
		});
		
		it("renders navigation links correctly", () => {
			const { getByText } = render(
				<Header menu={[
					{
						title: "Home",
						link: "/"
					},
					{
						title: "Test",
						link: "/test"
					}
				]} />
			);
			expect(getByText("Home")).toBeInTheDocument();
			expect(getByText("Test")).toBeInTheDocument();
		});
		
		it("renders search", () => {
			const { getByText } = render(<Header />);
			expect(getByText("Search")).toBeInTheDocument();
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
			}, {timeout: ANIMATION_DELAY + 100});
		});
	});
});
