type ImageProps = {
	sourceUrl: string,
	altText: string
};

type AuthorProps = {
	avatarUrl: string,
	name: string,
};

type CategoryProps = {
	name: string,
	slug: string,
}

type PostProps = {
	id: string,
	slug: string,
	title: string,
	excerpt: string,
	type: PostType,
	author: AuthorProps,
	categories?: CategoryProps[],
	featuredImage?: ImageProps
};
