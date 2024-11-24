import { PodcastCreator, WordPressCreator } from './page-creator.config';
import { CreatePageArgs } from 'gatsby';
import { mock } from 'jest-mock-extended';

describe('PodcastCreator', () => {
	let actions: CreatePageArgs['actions'];
	let graphql: jest.Mock;
	
	beforeEach(() => {
		actions = mock<CreatePageArgs['actions']>({ createPage: jest.fn() });
		graphql = jest.fn();
	});
	
	it('creates podcast pages with correct paths and context', async () => {
		graphql.mockResolvedValue({
			data: {
				allPodcastRssFeedEpisode: {
					nodes: [
						{ id: '1', item: { title: 'Episode 1' } },
						{ id: '2', item: { title: 'Episode 2' } },
					],
				},
			},
		});
		
		const creator = new PodcastCreator(actions, graphql);
		await creator.create();
		
		expect(actions.createPage).toHaveBeenCalledTimes(2);
		expect(actions.createPage).toHaveBeenCalledWith({
			path: '/podcast/episode-1',
			component: expect.any(String),
			context: { id: '1', slug: 'episode-1' },
		});
		expect(actions.createPage).toHaveBeenCalledWith({
			path: '/podcast/episode-2',
			component: expect.any(String),
			context: { id: '2', slug: 'episode-2' },
		});
	});
	
	it('handles empty podcast data gracefully', async () => {
		graphql.mockResolvedValue({ data: { allPodcastRssFeedEpisode: { nodes: [] } } });
		
		const creator = new PodcastCreator(actions, graphql);
		await creator.create();
		
		expect(actions.createPage).not.toHaveBeenCalled();
	});
});

describe('WordPressCreator', () => {
	let actions: CreatePageArgs['actions'];
	let graphql: jest.Mock;
	
	beforeEach(() => {
		actions = mock<CreatePageArgs['actions']>({ createPage: jest.fn() });
		graphql = jest.fn();
	});
	
	it('creates WordPress post and page pages with correct paths and context', async () => {
		graphql.mockResolvedValue({
			data: {
				allWpPost: {
					edges: [
						{ post: { id: '1', slug: 'post-1' } },
						{ post: { id: '2', slug: 'post-2' } },
					],
				},
				allWpPage: {
					edges: [
						{ page: { id: '1', slug: 'page-1' } },
						{ page: { id: '2', slug: 'page-2' } },
					],
				},
			},
		});
		
		const creator = new WordPressCreator(actions, graphql);
		await creator.create();
		
		expect(actions.createPage).toHaveBeenCalledWith({
			path: '/article/post-1',
			component: expect.any(String),
			context: { id: '1' },
		});
		expect(actions.createPage).toHaveBeenCalledWith({
			path: '/article/post-2',
			component: expect.any(String),
			context: { id: '2' },
		});
		expect(actions.createPage).toHaveBeenCalledWith({
			path: '/page/page-1',
			component: expect.any(String),
			context: { id: '1' },
		});
		expect(actions.createPage).toHaveBeenCalledWith({
			path: '/page/page-2',
			component: expect.any(String),
			context: { id: '2' },
		});
	});
	
	it('handles empty WordPress post and page data gracefully', async () => {
		graphql.mockResolvedValue({
			data: {
				allWpPost: { edges: [] },
				allWpPage: { edges: [] },
			},
		});
		
		const creator = new WordPressCreator(actions, graphql);
		await creator.create();
		
		expect(actions.createPage).not.toHaveBeenCalled();
	});
});
