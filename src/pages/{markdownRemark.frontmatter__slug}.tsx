import React, {FunctionComponent} from "react";
import {graphql, type HeadFC, PageProps} from "gatsby";
import {BaseLayout} from "@layouts";

const ArticleTemplate: FunctionComponent<PageProps<never>> = ({data}) => {
	const { markdownRemark } = data;
	const {  html } = markdownRemark;
	return (
		<BaseLayout>
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</BaseLayout>
	);
};

export const Head: HeadFC<never> = ({data}) => {
	const { markdownRemark } = data;
	const { frontmatter } = markdownRemark;
	const { title } = frontmatter;
	return (
		<title>{title} | Gamefoss</title>
	);
}

export const query = graphql`
	query($id: String!) {
	    markdownRemark(id: { eq: $id }) {
	      html
	      frontmatter {
	        date(formatString: "MMMM DD, YYYY")
	        slug
	        title
	      }
	    }
	  }
`;

export default ArticleTemplate;
