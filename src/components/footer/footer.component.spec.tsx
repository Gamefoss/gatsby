import React from "react";
import { render, screen } from "@testing-library/react";
import { Footer } from "@components";

jest.mock("@components", () => ({
	...jest.requireActual("@components"),
	Socials: () => <div data-testid="socials-component" />,
	Menu: () => <div data-testid="menu-component" />,
}));

describe("Footer", () => {
	it("renders footer content", () => {
		const { getByTestId } = render(<Footer />);
		expect(getByTestId("footer-component")).toBeInTheDocument();
	});
});
