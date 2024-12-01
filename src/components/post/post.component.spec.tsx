import React from "react";
import {fireEvent, render} from "@testing-library/react";
import {Post} from "@components";
import {navigate} from "gatsby";

const renderTestComponent = (inputProps?: Partial<PostProps>) => {
	
	const defaultProps: PostProps = {
		id: "1",
		type: "Post",
		title: "Mocked Title",
		slug: "mocked-slug",
		excerpt: "Mocked Excerpt",
		featuredImage: {
			sourceUrl: "/mock-image.jpg",
			altText: "Mocked Image"
		},
		author: {
			name: "Sr. Mock",
			slug: "sr-mock",
			avatarUrl: "/mock-avatar.jpg"
		},
		categories: [
			{
				name: "Mocked Category",
				slug: "mocked-category"
			}
		]
	}
	
	const props = {...defaultProps, inputProps};
	
	return render(
		<Post {...props} />
	);
}


describe("Post Component", () => {
	it("should render", () => {
		
		const {getByTestId, getByText} = renderTestComponent();
		expect(getByTestId("post-component")).toBeInTheDocument();
		expect(getByText("Mocked Title")).toBeInTheDocument();
	});
	
	it("Should navigate to the post page when clicked", () => {
		const {getByText} = renderTestComponent();
		const $badge = getByText("Mocked Category");
		fireEvent.click($badge);
		expect(navigate).toHaveBeenCalledWith('/categoria/mocked-category');
	});
});
