import {graphql, Link, useStaticQuery} from "gatsby";
import React, {FunctionComponent} from "react";
import {clsx} from "clsx";

import "./menu.component.css";

/**
 * This type is originate by picking some properties from the WpMenuItem type
 */
type MenuItem = Pick<Queries.WpMenuItem,
	'id' |
	'label' |
	'path' |
	'parentId' |
	'title' |
	'target' |
	'cssClasses'
> & { children: MenuItem[] };

/**
 * Build a tree structure from a flat list of menu items
 * @param items List of menu items
 * @param parentId Parent ID of the menu item
 */
const buildMenuTree = (items: Queries.WpMenuItem[], parentId: string | null = null): MenuItem[] => {
	return items
		.filter((item) => item.parentId === parentId)
		.map<MenuItem>((item) => ({
			...item,
			children: buildMenuTree(items, item.id)
		}));
};

/**
 * Transform the path of a menu item to something usable by Gatsby
 * @param path Path of the menu item
 */
const transformPath = (path: string): string => {
	if (path.startsWith('/cms/blog/')) {
		return path.replace('/cms/blog/', '/artigo/');
	}
	if (path.startsWith('/cms/categorias/')) {
		return path.replace('/cms/categorias/', '/categoria/');
	}
	if (path.startsWith('/cms/')) {
		return path.replace('/cms/', '/pagina/');
	}
	return path;
};

type MenuLinkProps = { path: string, title: string, target?: string, cssClasses?: string[], label: string };
/**
 * Menu link component
 * @description This component is responsible for rendering a menu link either as a Gatsby Link or a regular anchor tag
 * @param path Path of the link
 * @param title Title of the link
 * @param target Target of the link
 * @param cssClasses CSS classes of the link
 * @param label Label of the link
 * @constructor
 */
const MenuLink: FunctionComponent<MenuLinkProps> = ({path, title, target = "__self", cssClasses, label}) => {
	const transformedPath = transformPath(path);
	const isExternal = !transformedPath.startsWith('/');
	const props = {
		title,
		target,
		className: clsx(cssClasses)
	}
	
	return isExternal ? (
		<a
			href={transformedPath}
			{...props}
		>
			{label}
		</a>
	) : (
		<Link
			to={transformedPath}
			{...props}
		>
			{label}
		</Link>
	);
};

type MenuItemProps = { items: MenuItem[], className?: string };
/**
 * Menu item component
 * @description This component is responsible for rendering a menu item and its children
 * @param items
 * @param className
 * @constructor
 */
const MenuItem: FunctionComponent<MenuItemProps> = ({items, className}) => (
	<ul
		data-testid={"menu-component"}
		className={className}
	>
		{
			items.map(({
				           id,
				           label,
				           path,
				           cssClasses,
				           title,
				           target,
				           children
			           }) => (
				<li key={id}>
					<MenuLink
						path={path!}
						title={title!}
						target={target!}
						cssClasses={cssClasses as string[] || []}
						label={label!}
					/>
					{(children.length > 0) && <MenuItem items={children} className={"menu-component--item__submenu"}/>}
				</li>
			))
		}
	</ul>
);

type MenuProps = { location: string, classNames?: string };
const Menu: FunctionComponent<MenuProps> = ({location, classNames}) => {
	const data = useStaticQuery<Queries.Query>(graphql`
    {
      allWpMenu {
        nodes {
          id
          name
          slug
          menuItems {
            nodes {
              id
              label
              title
              path
              parentId
            }
          }
        }
      }
    }
  `);
	
	const [menu] = data?.allWpMenu?.nodes?.filter(({slug}) => slug == location);
	
	if (!menu) return null;
	
	const menuTree = buildMenuTree(menu.menuItems?.nodes as Queries.WpMenuItem[]);
	
	return (
		<nav className={clsx("menu-component", classNames)}>
			<MenuItem
				items={menuTree}
				className={"menu-component__list"}
			/>
		</nav>
	);
};

export {Menu};
