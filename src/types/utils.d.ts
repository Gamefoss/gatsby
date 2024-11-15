/**
 * DeepPartial
 * @description Makes all properties in T optional
 */
type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
