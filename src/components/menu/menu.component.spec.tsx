import React from "react";
import {render} from '@testing-library/react';
import { Menu } from '@components';
import { useStaticQuery } from 'gatsby';

describe('Menu', () => {
	beforeEach(() => {
		(useStaticQuery as jest.Mock).mockReturnValue({
			allWpMenu: {
				nodes: [
					{
						id: '1',
						name: 'Main Menu',
						slug: 'main-menu',
						menuItems: {
							nodes: [
								{ id: '1', label: 'Home', path: '/cms/', parentId: null },
								{ id: '2', label: 'Blog', path: '/cms/blog/', parentId: null },
								{ id: '3', label: 'Post 1', path: '/cms/blog/post-1', parentId: '2' },
								{ id: '4', label: 'Page 1', path: '/cms/page-1', parentId: null },
								{ id: '5', label: 'External Page', path: 'https://dihgg.com/', parentId: null },
							],
						},
					},
				],
			},
		});
	});
	
	it('renders menu items with transformed paths', () => {
		const { getByText } = render(<Menu location="main-menu" />);
		
		expect(getByText('Home').closest('a')).toHaveAttribute('href', '/pagina/');
		expect(getByText('Blog').closest('a')).toHaveAttribute('href', '/artigo/');
		expect(getByText('Post 1').closest('a')).toHaveAttribute('href', '/artigo/post-1');
		expect(getByText('Page 1').closest('a')).toHaveAttribute('href', '/pagina/page-1');
	});
	
	it('renders nested menu items correctly', () => {
		const { getByText } = render(<Menu location="main-menu" />);
		const {innerHTML} = getByText("Blog").parentElement!;
		expect(innerHTML).toContain('Post 1');
	});
	
	it('handles empty menu items gracefully', () => {
		(useStaticQuery as jest.Mock).mockReturnValue({
			allWpMenu: {
				nodes: [
					{
						id: '1',
						name: 'Main Menu',
						slug: 'main-menu',
						menuItems: { nodes: [] },
					},
				],
			},
		});
		
		const { container } = render(<Menu location="main-menu" />);
		
		expect(container.querySelector('ul')).toBeEmptyDOMElement();
	});
	
	it('handles missing menu location gracefully', () => {
		const { queryByTestId } = render(<Menu location="non-existent-menu" />);
		
		expect(queryByTestId("menu-component")).not.toBeInTheDocument();
	});
});
