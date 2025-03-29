import React from "react";

import "@mocks/layouts.mock";
import {render} from "@testing-library/react";
import CategoryTemplate from "./category.template";
import {mock} from "jest-mock-extended";
import {Head} from "./category.template";
import {HeadProps} from "gatsby";
import {PostNormalizer} from "@normalizers";
import * as Components from "@components";


jest.spyOn(PostNormalizer, 'normalizeList').mockImplementation(((posts?: Queries.WpPost[]) => posts as unknown as PostProps[]));

jest.spyOn(Components, "Listing").mockImplementation((props: {posts: PostProps[]}) => (
	<ul>
		{props.posts.map((post: any) => (
			<li key={post.id}>
				<span>{post.title}</span>
				{post.featuredImage && (
					<img
						data-testid="mocked-image"
						src={post.featuredImage?.sourceUrl}
						alt={post.featuredImage?.altText}
					/>
				)}
			</li>
		))}
	</ul>
));

const renderTestComponent = (inputProps?: Partial<{
	name: string,
	posts: Queries.WpPost[]
}>) => {
	const defaultValues = {
		name: "Category Name",
		posts: [
			{id: "1", title: "Post 1"},
			{id: "2", title: "Post 2"},
			{id: "3", title: "Post 3"}
		]
	} as unknown as Queries.WpCategory;
	const props = {...defaultValues, ...inputProps};
	const {name, posts} = props;
	return render(
		<CategoryTemplate
			{...mock()}
			children={undefined}
			data={{
				wpCategory: {
					name,
					posts: {
						nodes: posts
					}
				} as unknown as Queries.WpCategory
			}}
		/>
	);
}

describe("CategoryTemplate", () => {
	
	it("Should render correctly", () => {
		const {getByTestId} = renderTestComponent();
		expect(getByTestId("category-template")).toBeInTheDocument();
	});
	
	it("Should render Listing component properly", () => {
		const {getByText} = renderTestComponent();
		expect(getByText("Post 1")).toBeInTheDocument();
	});
	
	it("Should render with featured image", () => {
		const {getByTestId} = renderTestComponent({
			posts: [
				{
					id: "1",
					title: "Post 1",
					featuredImage: {
						node: {
							sourceUrl: "mocked-image.png",
							altText: "Mocked Image"
						}
					}
				}
			] as Queries.WpPost[]
		});
		expect(getByTestId("mocked-image")).toBeInTheDocument();
	});
	
	it("Should render without posts gracefully", () => {
		const {queryByText} = renderTestComponent({ posts: []});
		expect(queryByText("Post 1")).not.toBeInTheDocument();
	});
	
});

describe("Head", () => {
	
	
	it("renders Head", () => {
		const { getByText } = render(Head(mock({
			data: {
				wpCategory: {
					name: "Category Name"
				}
			}
		} as HeadProps)));
		expect(getByText("Category Name | Gamefoss")).toBeInTheDocument();
	});
});
