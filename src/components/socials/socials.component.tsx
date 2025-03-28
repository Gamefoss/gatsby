import React, {FunctionComponent} from "react";
import {SOCIALS} from "@constants";
import {SocialIcon} from "react-social-icons";

import "./socials.component.css";

/**
 * Socials component
 * @description This component will render a list of social links and icons
 * @param socials List of social links
 * @param size Size of the social icons
 * @constructor
 */
const Socials: FunctionComponent<{
	socials?: Social[],
	size?: number
}> = ({
	      socials = SOCIALS,
	      size = 50
      }) => {
	return (
		<ul className="socials-component">
			{
				socials.map(({link}, index) => (
					<li key={`social-${index}`}>
						<SocialIcon
							url={link}
							bgColor={"none"}
							className="social-icon"
							style={{
								width: size,
								height: size
							}}
						/>
					</li>
				))
			}
		</ul>
	);
}

export {Socials};
