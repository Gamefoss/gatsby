import { PostNormalizer } from './post.normalizer';

describe('PostNormalizer', () => {
	const normalizer = new PostNormalizer();
	
	const basePost = {
		id: '1',
		title: 'Post Title',
		slug: 'post-title',
		excerpt: 'Post Excerpt',
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
		type: 'Post',
		featuredImage: {
			sourceUrl: '/image.jpg',
			altText: 'Image Alt Text'
		},
		author: {
			name: 'Author Name',
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
		
		const [result] = normalizer.normalize(posts);
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
		
		const [result] = normalizer.normalize(posts);
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
		
		const [result] = normalizer.normalize(posts);
		expect(result).toEqual(expectedPost);
	});
});
