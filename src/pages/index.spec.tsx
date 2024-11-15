import React from "react";
import { render } from "@testing-library/react";
import IndexPage from "./index";
import {mock} from "jest-mock-extended";
import {PageProps} from "gatsby";

test("renders IndexPage with podcast episodes", () => {
	const mockedData = {
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
	const props = mock<PageProps>();
	const { getByText } = render(<IndexPage {...props} data={mockedData} />);
	
	expect(getByText("Episode 1")).toBeInTheDocument();
	expect(getByText("Episode 2")).toBeInTheDocument();
});
