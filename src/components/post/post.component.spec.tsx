import React from "react";
import {render} from "@testing-library/react";
import {Post} from "@components";
import {mock, mockDeep} from "jest-mock-extended";

describe("Post Component", () => {
	it("should render", () => {
		
		const featureImage = {
			node: {
				sourceUrl: "image.png",
				altText: "alt text"
			}
		} as Queries.WpPost['featuredImage'];
		
		const {getByTestId, getByText} = render(
			<Post
				{...mockDeep<Queries.WpPost>({
					title: "Title",
					slug: "slug",
					excerpt: "excerpt",
				})}
				featuredImage={featureImage}
			/>
		);
		expect(getByTestId("post-component")).toBeInTheDocument();
		expect(getByText("Title")).toBeInTheDocument();
	});
});
