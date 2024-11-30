type ImageProps = {
	sourceUrl: string,
	altText: string
};

type PostProps = {
	id: string,
	slug: string,
	title: string,
	excerpt: string,
	type: PostType,
	featuredImage?: ImageProps
};
