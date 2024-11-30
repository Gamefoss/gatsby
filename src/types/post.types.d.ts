type ImageProps = {
	sourceUrl: string,
	altText: string
};

type AuthorProps = {
	avatarUrl: string,
	name: string,
};

type PostProps = {
	id: string,
	slug: string,
	title: string,
	excerpt: string,
	type: PostType,
	author: AuthorProps,
	featuredImage?: ImageProps
};
