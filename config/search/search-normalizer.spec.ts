import {SearchNormalizer} from "./search-normalizer";
import slugify from "slugify";

describe("SearchNormalizer", () => {
	it("Should be able to normalize different types of structures", () => {
		const normalizer = new SearchNormalizer(slugify);
		const mockedItems = [
			{node: {id: "1", title: "title", slug: "slug", content: "body"}},
			{node: {id: "2", name: "title", slug: "slug", content: "body"}},
			{node: {id: "3", item: { title: "title", link: "I should be a slug", contentSnippet: "body" } }}
		];
		expect(normalizer.normalize(mockedItems))
			.toEqual([
				{id: "1", title: "title", slug: "slug", body: "body"},
				{id: "2", title: "title", slug: "slug", body: "body"},
				{id: "3", title: "title", slug: "i-should-be-a-slug", body: "body"},
			]);
	});
});
