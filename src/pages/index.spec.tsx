import React from "react";
import {render, screen} from "@testing-library/react";
import {mock} from "jest-mock-extended";
import {PodcastRssFeedEpisodeData} from "gatsby-source-podcast-rss-feed";

import "@mocks/layouts.mock";

import IndexPage, {Head} from "./index";

describe("IndexPage", () => {
	
	const mockedData: PodcastRssFeedEpisodeData = {
		allPodcastRssFeedEpisode: {
			nodes: [
				{
					item: {
						title: "Episode 1",
						link: "/episode-1",
						itunes: {
							duration: "30:00",
							image: "image1.jpg",
							summary: "Summary of episode 1",
						},
					},
				},
				{
					item: {
						title: "Episode 2",
						link: "/episode-2",
						itunes: {
							duration: "45:00",
							image: "image2.jpg",
							summary: "Summary of episode 2",
						},
					},
				},
			],
		},
	};
	
	it("renders IndexPage with podcast episodes", () => {
		const { getByText } = render(
			<IndexPage
				{...mock()}
				data={mockedData}
				children={undefined}
			/>
		);
		expect(getByText("Episode 1")).toBeInTheDocument();
		expect(getByText("Episode 2")).toBeInTheDocument();
	});
	it("renders IndexPage without podcast episodes", () => {
		const { queryByText } = render(
			<IndexPage
				{...mock()}
				data={{allPodcastRssFeedEpisode: {nodes: []}}}
				children={undefined}
			/>
		);
		expect(queryByText("Episode 1")).not.toBeInTheDocument();
		
	});
});

describe("Head", () => {
	
	
	it("renders Head", () => {
		const { getByText } = render(Head(mock()));
		expect(getByText("Home Page | Gamefoss")).toBeInTheDocument();
	});
});
