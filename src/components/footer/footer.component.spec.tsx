import React from "react";
import { render } from "@testing-library/react";
import { Footer } from "@components";

describe("Footer", () => {
	it("renders footer content", () => {
		const { getByTestId } = render(<Footer />);
		expect(getByTestId("footer-component")).toBeInTheDocument();
	});
});
