import {SearchNormalizer} from "./search-normalizer";

describe("SearchNormalizer", () => {
	it("Should be able to normalize different types of structures", () => {
		const normalizer = new SearchNormalizer();
		const mockedItems = [
			{node: {id: "1", title: "title", slug: "slug", content: "body", nodeType: "Post"}},
			{node: {id: "2", name: "title", slug: "slug", content: "body", nodeType: "Page"}},
			{node: {id: "3", name: "title", slug: "slug", content: "body", nodeType: "Category"}},
			{node: {id: "4", name: "title", slug: "slug", content: "body", nodeType: "Tag"}},
			{node: {id: "5", name: "title", slug: "slug", content: "body", nodeType: "Unknown"}},
			{node: {id: "6", item: { title: "Podcast Example", link: "//mock.com/you-should-not-see-me", contentSnippet: "body" } }}
		];
		expect(normalizer.normalize(mockedItems))
			.toEqual([
				{id: "1", title: "title", slug: "artigo/slug", body: "body", type: "Post"},
				{id: "2", title: "title", slug: "pagina/slug", body: "body", type: "Page"},
				{id: "3", title: "title", slug: "categoria/slug", body: "body", type: "Category"},
				{id: "4", title: "title", slug: "tag/slug", body: "body", type: "Tag"},
				{id: "5", title: "title", slug: "slug", body: "body", type: "Unknown"},
				{id: "6", title: "Podcast Example", slug: "podcast/podcast-example", body: "body", type: "Podcast"},
			]);
	});
});
