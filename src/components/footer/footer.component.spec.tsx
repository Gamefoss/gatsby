import React from "react";
import { render, screen } from "@testing-library/react";
import { Footer } from "@components";

jest.mock("@components", () => ({
	...jest.requireActual("@components"),
	Socials: () => <div data-testid="socials-component" />,
}));

describe("Footer", () => {
	it("renders footer content", () => {
		const { getByTestId } = render(<Footer />);
		console.log(screen.logTestingPlaygroundURL())
		expect(getByTestId("footer-component")).toBeInTheDocument();
	});
});
