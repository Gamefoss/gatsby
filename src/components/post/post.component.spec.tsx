import React from "react";
import {render} from "@testing-library/react";
import {Post} from "@components";

describe("Post Component", () => {
	it("should render", () => {
		
		const {getByTestId, getByText} = render(
			<Post
				id={"1"}
				type={"Post"}
				title={"Mocked Title"}
				slug={"mocked-slug"}
				excerpt={"Mocked Excerpt"}
				featuredImage={{
					sourceUrl: "/mock-image.jpg",
					altText: "Mocked Image"
			}}
			/>
		);
		expect(getByTestId("post-component")).toBeInTheDocument();
		expect(getByText("Mocked Title")).toBeInTheDocument();
	});
});
