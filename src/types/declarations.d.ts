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
