import React from "react";
import { render } from "@testing-library/react";
import { BaseLayout } from "@layouts";

jest.mock("@components", () => ({
	Header: () => <div>Mocked Header</div>,
	Footer: () => <div>Mocked Footer</div>,
}));

describe("BaseLayout", () => {
	it("Should render children, <HeaderComponent /> and <main /> correctly", () => {
		const { getByText, getByTestId } = render(
			<BaseLayout>
				<div>Test Child</div>
			</BaseLayout>
		);
		expect(getByText("Test Child")).toBeInTheDocument();
		expect(getByText("Mocked Header")).toBeInTheDocument();
		expect(getByTestId("main-content")).toBeInTheDocument();
	});
});
