import React from "react";

import "./footer.component.css";
const Footer = () => {
	return (
		<footer data-testid="footer-component">
			<div>The socials will be here</div>
			<div>The links will be here</div>
			<div className="disclaimer">
				<div className="site-wrapper">
					<p>&copy; {new Date().getFullYear()} Todos os direitos reservados</p>
				</div>
			</div>
		</footer>
	);
}

export {Footer};
