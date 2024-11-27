import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {mock, mockDeep} from "jest-mock-extended";

import "@mocks/layouts.mock";

import CategoryTemplate from "./category.template";

jest.mock("@constants", () => ({
	POSTS_PER_PAGE: 1
}));

jest.mock("@components", () => ({
	Post: (props: any) => <div id={props.id}>{props.title}</div>
}));

describe("CategoryTemplate", () => {
	
	const renderTestComponent = () => {
		return render(
			<CategoryTemplate
				{ ...mock() }
				data={mockDeep<{wpCategory: Queries.WpCategory}>({
					wpCategory: {
						name: "Mock Category",
						posts: {
							nodes: [
								{
									id: "1",
									title: "Post 1",
								},
								{
									id: "2",
									title: "Post 2",
								}
							]
						}
					}
				})}
				children={undefined}
			/>
		);
	}
	
	it("should render CategoryTemplate", () => {
		const {getByTestId, getByText} = renderTestComponent();
		expect(getByTestId("category-template")).toBeInTheDocument();
		expect(getByText("Post 1")).toBeInTheDocument();
	});

	it("should be able load more posts", () => {
		const {getByTestId, getByText} = renderTestComponent();
		const $loadBtn = getByTestId("category-template__load-more");
		fireEvent.click($loadBtn);
		expect(getByText("Post 2")).toBeInTheDocument();
	});
});
