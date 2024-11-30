interface IPostNormalizer {
	normalize: (posts: never[]) => PostProps[]
}

export class PostNormalizer implements IPostNormalizer {
	normalize(posts: Queries.WpPost[]): PostProps[] {
		return posts.map((post) => {
			const {
				id,
				title,
				slug,
				excerpt,
				featuredImage,
				nodeType,
				author,
				categories
			} = post;
			
			const image: ImageProps | undefined = featuredImage ? {
				sourceUrl: featuredImage.node.sourceUrl as string,
				altText: featuredImage.node.altText as string
			} : undefined;
			
			const authorData: AuthorProps = {
				name: author?.node.name as string,
				avatarUrl: author?.node.avatar?.url as string
			};
			
			const categoriesData: CategoryProps[] | undefined = categories?.nodes
				.map(({
					      name,
					      slug
				      }) => ({
					name: name as string,
					slug: slug as string
				}));
			
			
			return {
				id,
				title,
				slug,
				excerpt,
				type: nodeType as PostType,
				featuredImage: image,
				author: authorData,
				categories: categoriesData
			} as PostProps;
		});
	}
	
}
