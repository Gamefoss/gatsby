import { PostNormalizer } from './post.normalizer';

describe('PostNormalizer', () => {
	
	const basePost = {
		id: '1',
		title: 'Post Title',
		slug: 'post-title',
		excerpt: 'Post Excerpt',
		content: '<p>Post Content</p>',
		date: '2023-10-01T00:00:00Z',
		featuredImage: {
			node: {
				sourceUrl: '/image.jpg',
				altText: 'Image Alt Text'
			}
		},
		nodeType: 'Post',
		author: {
			node: {
				name: 'Author Name',
				slug: 'author-name',
				avatar: {
					url: '/avatar.jpg'
				}
			}
		},
		categories: {
			nodes: [
				{
					name: 'Category Name',
					slug: 'category-slug'
				}
			]
		}
	} as unknown as Queries.WpPost;
	
	const baseExpectedPost: PostProps = {
		id: '1',
		title: 'Post Title',
		slug: 'post-title',
		excerpt: 'Post Excerpt',
		content: '<p>Post Content</p>',
		date: new Date('2023-10-01T00:00:00Z'),
		type: 'Post',
		featuredImage: {
			sourceUrl: '/image.jpg',
			altText: 'Image Alt Text'
		},
		author: {
			name: 'Author Name',
			slug: 'author-name',
			avatarUrl: '/avatar.jpg'
		},
		categories: [
			{
				name: 'Category Name',
				slug: 'category-slug'
			}
		]
	};
	
	it('normalizes posts correctly', () => {
		const posts = [basePost];
		
		const [result] = PostNormalizer.normalizeList(posts);
		expect(result).toEqual(baseExpectedPost);
	});
	
	it('handles posts with missing featured image', () => {
		const posts: Queries.WpPost[] = [
			{
				...basePost,
				featuredImage: null
			}
		];
		
		const expectedPost: PostProps = {
			...baseExpectedPost,
			featuredImage: undefined
		};
		
		const [result] = PostNormalizer.normalizeList(posts);
		expect(result).toEqual(expectedPost);
	});
	
	it('handles posts with missing categories', () => {
		const posts: Queries.WpPost[] = [
			{
				...basePost,
				categories: null
			}
		];
		
		const expectedPost: PostProps = {
			...baseExpectedPost,
			categories: undefined
		};
		
		const [result] = PostNormalizer.normalizeList(posts);
		expect(result).toEqual(expectedPost);
	});
	
	it('handles empty post list', () => {
		const result = PostNormalizer.normalizeList([]);
		expect(result).toEqual([]);
	});
});
