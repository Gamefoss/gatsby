type PostType = 'Podcast' | 'Post' | 'Page' | 'Category' | 'Tag' | string;

type ImageProps = {
	sourceUrl: string,
	altText: string
};

type AuthorProps = {
	avatarUrl: string,
	slug: string,
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
	content?: string,
	date?: Date,
	type: PostType,
	author?: AuthorProps,
	categories?: CategoryProps[],
	featuredImage?: ImageProps
};
