
type SearchResult = {
	id: string
	title: string
	slug: string
	body: string
	type: 'Podcast' | 'Post' | 'Page' | 'Category' | 'Tag' | undefined
}
