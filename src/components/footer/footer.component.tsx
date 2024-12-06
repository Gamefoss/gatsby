import React, {FunctionComponent} from "react";

import {Menu, Socials} from "@components";

import dihggLogo from "@images/dihgg.svg";

import "./footer.component.css";

const Footer: FunctionComponent = () => {
	return (
		<footer
			data-testid="footer-component"
			className="footer-component"
		>
			<div className="socials-container">
				<div className="socials site-wrapper">
					<p>Nos siga nas redes Sociais:</p>
					<Socials />
				</div>
			</div>
			<div className="footer-component__menu">
				<Menu
					location={"footer-menu"}
					classNames={"site-wrapper"}
				/>
			</div>
			<div className="disclaimer">
				<div className="site-wrapper">
					<p>&copy; {new Date().getFullYear()} Todos os direitos reservados</p>
					<p>Todas as imagens de filmes, jogos, séries e etc são marcas registradas dos seus respectivos proprietários
					</p>
					<br/>
					<p className="dihgg">
						<span>Desenvolvido por:&nbsp;</span>
						<a
							href="//dihgg.com"
							target="_blank"
							rel="noreferrer"
							title={"Dihgg"}
						>
							<img
								src={dihggLogo}
								alt={"Dihgg"}
							/>
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}

export {Footer};
