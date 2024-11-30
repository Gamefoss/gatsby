import React from "react";

import "@mocks/layouts.mock";
import {render} from "@testing-library/react";
import CategoryTemplate from "./category.template";
import {mock} from "jest-mock-extended";
import {Head} from "./category.template";
import {HeadProps} from "gatsby";


jest.mock("@components", () => ({
	Listing: (props: { posts: PostProps[] }) => (
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
	)
}));

type ComponentProps = {
	name: string,
	posts: {
		id: string,
		title: string,
		featuredImage?: {
			node: {
				sourceUrl: string,
				altText: string
			}
		}
	}[]
};
const renderTestComponent = (inputProps?: Partial<ComponentProps>) => {
	const defaultValues: ComponentProps = {
		name: "Category Name",
		posts: [
			{id: "1", title: "Post 1"},
			{id: "2", title: "Post 2"},
			{id: "3", title: "Post 3"}
		]
	};
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
							sourceUrl: "http://source.url",
							altText: "Alt Text"
						}
					}
				}
			]
		});
		expect(getByTestId("mocked-image")).toBeInTheDocument();
	})
	;
	
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
