import React from "react";
import {fireEvent, render} from "@testing-library/react";
import {Listing} from "@components";
import {mock} from "jest-mock-extended";

jest.mock("@constants", () => ({
	POSTS_PER_PAGE: 1
}));

jest.mock("@components", () => ({
	...jest.requireActual("@components"),
	Post: (props: any) => <div id={props.id}>{props.title}</div>
}));

describe("Listing Component", () => {
	const renderTestComponent = (posts: PostProps[] = [
		{
			...mock(),
			id: "1",
			title: "Post 1",
		},
		{
			...mock(),
			id: "2",
			title: "Post 2",
		}
	]) => {
		return render(
			<Listing
				posts={posts}
			/>
		);
	};
	
	it("Should render Listing Component without all posts visible", () => {
		const {getByTestId, queryByText, getByText} = renderTestComponent();
		expect(getByTestId("listing-component")).toBeInTheDocument();
		expect(getByText("Post 1")).toBeInTheDocument();
		expect(queryByText("Post 2")).not.toBeInTheDocument();
	});
	
	it("Should be able to load more posts", () => {
		const {getByTestId, queryByText, getByText} = renderTestComponent();
		const $loadBtn = getByTestId("listing-component__load-more");
		expect(queryByText("Post 2")).not.toBeInTheDocument();
		fireEvent.click($loadBtn);
		expect(getByText("Post 2")).toBeInTheDocument();
	});
	
	it("Should render no posts message", () => {
		const {getByTestId} = renderTestComponent([]);
		expect(getByTestId("listing-component__no-posts")).toBeInTheDocument();
	});
	
});
