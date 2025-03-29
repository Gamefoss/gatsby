import React from "react";
import {fireEvent, render} from "@testing-library/react";
import {Author} from "@components";
import {navigate} from "gatsby";

const renderTestComponent = (inputProps?: Partial<AuthorProps> ) => {
	const defaultProps: AuthorProps = {
		name: "Mr. Mock",
		slug: "mr-mock",
		avatarUrl: "mr-mock.jpg",
	};
	const props = {...defaultProps, ...inputProps};
	return render(<Author {...props} />);
}

describe("Author", () => {
	it("should render", () => {
		const {getByText} = renderTestComponent();
		
		expect(getByText("Mr. Mock")).toBeInTheDocument();
	});

	it.skip("should navigate to author page upon clicking", () => {
		const {getByTestId} = renderTestComponent();
		const $button = getByTestId("author-component");
		fireEvent.click($button);
		expect(navigate).toHaveBeenCalledWith("/autor/mr-mock");
	});
});
