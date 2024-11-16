import React from "react";
import {render} from "@testing-library/react";
import {mock} from "jest-mock-extended";
import ArticleTemplate, {Head} from "./{markdownRemark.frontmatter__slug}";

jest.mock("@layouts", () => ({
	BaseLayout: ({children}: { children: React.ReactNode }) => <>{children}</>,
}));

describe("ArticleTemplate", () => {
	it("renders article content", () => {
		const data = {
			markdownRemark: {
				html: "<p>Test content</p>",
			},
		} as never;
		const {container} = render(<ArticleTemplate {...mock()} data={data} children={undefined}/>);
		expect(container.innerHTML).toContain("<p>Test content</p>");
	});
	
	it("renders empty content when no html is provided", () => {
		const data = {
			markdownRemark: {
				html: "",
			},
		} as never;
		const {container} = render(<ArticleTemplate {...mock()} data={data} children={undefined}/>);
		expect(container.innerHTML).toBe("<div></div>");
	});
});

describe("Head", () => {
	it("renders title with article title", () => {
		const data = {
			markdownRemark: {
				frontmatter: {
					title: "Test Title",
				},
			},
		} as never;
		const {container} = render(<Head {...mock()} data={data}/>);
		expect(container.querySelector("title")?.textContent).toBe("Test Title | Gamefoss");
	});
	
	it("renders default title when no title is provided", () => {
		const data = {
			markdownRemark: {
				frontmatter: {
					title: "",
				},
			},
		} as never;
		const {container} = render(<Head {...mock()} data={data}/>);
		expect(container.querySelector("title")?.textContent).toBe(" | Gamefoss");
	});
});
