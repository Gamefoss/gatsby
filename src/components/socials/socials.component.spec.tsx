import React from "react";
import {render} from "@testing-library/react";
import {Socials} from "@components";

jest.mock('@constants', () => ({
	SOCIALS: [
		{
			title: "Mock",
			link: "//mock.com"
		}
	]
}))

describe("Socials", () => {
	it("Should render Socials on CONSTANTS by default", () => {
		const {container} = render(<Socials/>);
		expect(container.innerHTML).toContain("//mock.com");
	});
	it('should render Socials using passed props', () => {
		const {container} = render(
			<Socials
				socials={[
					{
						title: "Test",
						link: "//test.com"
					}
				]}
			/>
		);
		expect(container.innerHTML).toContain("//test.com");
	});
});
