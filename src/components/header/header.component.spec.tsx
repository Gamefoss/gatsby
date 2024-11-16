import React, {ReactNode} from "react";
import {render, fireEvent, waitFor} from "@testing-library/react";
import {Header} from "@components";
import {ANIMATION_DELAY} from "@constants";

jest.mock("gatsby", () => ({
	...jest.requireActual("gatsby"),
	useStaticQuery: jest.fn(),
	Link: ({ to, children }: { to: string, children: ReactNode}) => <a href={to}>{children}</a>,
}));

jest.mock('@heroicons/react/24/solid', () => ({
	Bars3Icon: () => <div>Menu</div>,
	XMarkIcon: () => <div>Close</div>,
	MagnifyingGlassIcon: () => <div>Search</div>,
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
		
		it("renders search button", () => {
			const { getByTestId } = render(<Header />);
			expect(getByTestId("header-search-toggle")).toBeInTheDocument();
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
