import React from "react";
import {fireEvent, render} from "@testing-library/react";
import {Listing, ListingProps} from "@components";
import {mock} from "jest-mock-extended";

jest.mock("@constants", () => ({
	POSTS_PER_PAGE: 1
}));

jest.mock("@components", () => ({
	...jest.requireActual("@components"),
	Post: (props: any) => <div id={props.id}>{props.title}</div>,
	Button: (props: any) => <button {...props}>{props.children}</button>
}));

describe("Listing Component", () => {
	const renderTestComponent = (inputProps?: Partial<ListingProps>) => {
		
		const defaultProps: ListingProps = {
			name: "Mocked Listing",
			posts: [
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
			]
		}
		
		const props = {...defaultProps, ...inputProps}
		
		return render(
			<Listing
				{...props}
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
		const {getByTestId} = renderTestComponent({posts: []});
		expect(getByTestId("listing-component__no-posts")).toBeInTheDocument();
	});
	
	it("Should render background image from one of the post images", () => {
		const {getByTestId} = renderTestComponent({posts: [
				{
					...mock(),
					id: "1",
					title: "Post 1",
					featuredImage: {
						sourceUrl: "image.png",
						altText: "Mocked Image"
					}
				}
			]});
		expect(getByTestId("listing-component__header__image")).toBeInTheDocument();
		expect(getByTestId("listing-component__header__image")).toHaveStyle({
			backgroundImage: "url(image.png)"
		})
	});
	
});
