/**
 * DeepPartial
 * @description Makes all properties in T optional
 */
type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Declare svg files as modules so we can reference it in our code
 */
declare module "*.svg" {
	const content: any;
	export default content;
}

/**
 * Declare react-use-flexsearch module as this module does not have types
 */
declare module "react-use-flexsearch" {
	export function useFlexSearch(query: string, index: any, store: any): any[];
}
