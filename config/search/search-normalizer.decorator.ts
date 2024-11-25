import slugify from "slugify";
import {SLUGIFY_OPTIONS} from "../../src/constants";

/**
 * This function will transform the slug of the search result based on the source.
 * @param type
 * @param slug
 */
const transform = ({type, slug, title}: SearchResult) => {
	switch (type) {
		case "Podcast":
			return `podcast/${slugify(title, SLUGIFY_OPTIONS)}`;
		case "Post":
			return `article/${slug}`;
		case "Page":
			return `page/${slug}`;
		case "Category":
			return `category/${slug}`;
		case "Tag":
			return `tag/${slug}`;
		default:
			return slug;
	}
}
/**
 * @description This decorator will change the slug of the search result based on the source.
 * @description The transform should work as follows:
 * @description
 * * **Podcast:** `podcast/${slugify-title}`.
 * * **Others:** there is no need to change the slug.
 * @description Future sources can be added here as needed
 * @param _target - not needed for this decorator
 * @param _propertyKey - not needed for this decorator
 * @param descriptor - the property descriptor for the method
 */
export const slugTransform = (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
	const originalNormalize = descriptor.value;
	descriptor.value = function (...args: any[]) {
		const results = originalNormalize.apply(this, args) as SearchResult[];
		return results.map((result) => {
			return {
				...result,
				slug: transform(result)
			};
		})
	}
	return descriptor;
}
