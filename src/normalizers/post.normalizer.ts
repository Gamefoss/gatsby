import {parseISO} from "date-fns";

/**
 * Class to normalize post data.
 */
export class PostNormalizer {
	/**
	 * Static method to normalize a single post.
	 * @param {Queries.WpPost} post - The post data to normalize.
	 * @returns {PostProps} The normalized post data.
	 */
	static normalize(post: Queries.WpPost): PostProps {
		const {
			id,
			title,
			slug,
			excerpt,
			featuredImage,
			nodeType,
			author,
			categories,
			content,
			date,
		} = post;
		
		const image: ImageProps | undefined = featuredImage ? {
			sourceUrl: featuredImage.node.sourceUrl!,
			altText: featuredImage.node.altText!
		} : undefined;
		
		const authorData: AuthorProps = {
			name: author?.node.name!,
			slug: author?.node.slug!,
			avatarUrl: author?.node.avatar?.url!
		};
		
		const categoriesData: CategoryProps[] | undefined = categories?.nodes
			.map(({ name, slug }) => ({
				name: name!,
				slug: slug!
			}));
		
		return {
			id,
			title,
			slug,
			excerpt,
			content,
			date: date && parseISO(date),
			type: nodeType as PostType,
			featuredImage: image,
			author: authorData,
			categories: categoriesData
		} as PostProps;
	}
	
	/**
	 * Static method to normalize a list of posts.
	 * @param {Queries.WpPost[]} [posts] - The list of posts to normalize.
	 * @returns {PostProps[]} The list of normalized post data.
	 */
	static normalizeList(posts: Queries.WpPost[]): PostProps[] {
		return posts.map(PostNormalizer.normalize);
	}
}
