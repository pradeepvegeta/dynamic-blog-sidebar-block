/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * Custom react hook for retrieving props from registered selectors.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/#useselect
 */

import { useSelect } from "@wordpress/data";

/**
 * useEffect is a React Hook that lets you synchronize a component with an external system.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/#useeffect
 */
import { useEffect } from "@wordpress/element";

/**
 * Store definition for the editor namespace.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-editor/#store
 */

import { store as editorStore } from "@wordpress/editor";

// Query Selector H2
function h2QuerySelect(headings) {
	return Array.from(headings).map((h2) => {
		const getContent = h2.textContent;
		const id = getContent.trim().toLowerCase().replace(/\s+/g, "-");
		h2.setAttribute("id", id);
		return { id, text: getContent };
	});
}

// Error Handling
function Error() {
	return (
		<p>
			{__(
				"Please make sure the content was on the post and h2 tags",
				"dynamic-blog-sidebar-block"
			)}
		</p>
	);
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

export default function Edit({ attributes, setAttributes }) {
	const { h2tags, postId } = attributes;

	const { getEditedPostContent, getCurrentPostType, getCurrentPostId } =
		useSelect((select) => ({
			getEditedPostContent: select(editorStore).getEditedPostContent(),
			getCurrentPostType: select(editorStore).getCurrentPostType(),
			getCurrentPostId: select(editorStore).getCurrentPostId(),
		}));

	if (getCurrentPostType !== "post") {
		// Bail if current post type is not Posy
		return;
	}

	useEffect(() => {
		const parser = new DOMParser(); // Parse HTML string into DOM
		const parsedDocument = parser.parseFromString(
			getEditedPostContent,
			"text/html"
		);
		const headings = parsedDocument.querySelectorAll("h2");
		const h2TagsArray = h2QuerySelect(headings);
		setAttributes({ h2tags: h2TagsArray, postId: getCurrentPostId });
	}, [getEditedPostContent]);

	return (
		<div
			{...useBlockProps({
				["data-post-id"]: postId,
			})}
		>
			{h2tags && h2tags.length ? (
				<ul className="navigation-links">
					{h2tags.map((tag, index) => (
						<li className="navigation-link">
							<a className="anchor-link" href={`#${tag.id}`}>
								{tag.text}
							</a>
						</li>
					))}
				</ul>
			) : (
				<Error />
			)}
		</div>
	);
}
