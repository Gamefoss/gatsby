import { BaseLayout } from "@layouts";
import { graphql, HeadFC, PageProps } from "gatsby";
import React, { FunctionComponent } from "react";
import {PostNormalizer} from "@normalizers";
import {Author} from "@components";
import {formatDate} from "date-fns";

const ArticleTemplate: FunctionComponent<PageProps<{wpPost: Queries.WpPost}>> = ({data}) => {
	const normalizedPost = PostNormalizer.normalize(data.wpPost);
	const {
		title,
		author,
		excerpt,
		content,
		date,
	} = normalizedPost;
	
	return (
		<BaseLayout>
			<article>
				<header>
					<h1>{title}</h1>
					<p>{excerpt}</p>
					<Author {...author} />
					<time dateTime={formatDate(date!, "yyyy-mm-dd")}>{formatDate(date!, "dd/mm/yyyy")}</time>
				</header>
				<section dangerouslySetInnerHTML={{__html: content!}} />
			</article>
		</BaseLayout>
	);
}

export const Head: HeadFC<{wpPost: Queries.WpPost}> = ({data}) => {
	const {title} = data.wpPost;
	return(
		<title>{title} | Gamefoss</title>
	);
}

export const query = graphql`
	query($id: String!) {
		wpPost(id: {eq: $id}) {
			title
			date
			excerpt
			content
			author {
				node {
					name
					username
					url
					avatar {
						url
					}
				}
			}
		}
	}
`;

export default ArticleTemplate;
