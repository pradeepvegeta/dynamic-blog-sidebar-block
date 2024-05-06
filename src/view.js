/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

const SELECTOR = ".wp-block-create-block-dynamic-blog-sidebar-block";

// This function observes the intersection of elements in the viewport and updates navigation links accordingly.
function intersectionObserver(entries) {
	const getLinks = document.querySelectorAll(".navigation-link a");
	entries.forEach((entry) => {
		if (entry.isIntersecting === true) {
			const getId = entry.target.getAttribute("id");
			getLinks.forEach((link) => {
				link.classList.remove("active");
				const gethref = link.getAttribute("href").replace(/^#/, "");
				if (getId === gethref) {
					link.classList.add("active");
				}
			});
		}
	});
}

// This function initializes the observer to track intersections of elements on the page.
function onDocumentReady() {
	const getDynamicBlock = document.querySelectorAll(SELECTOR);

	if (!getDynamicBlock) {
		return;
	}

	const getH2 = document.querySelectorAll("h2");

	const observer = new IntersectionObserver(intersectionObserver, {
		root: null,
		rootMargin: "0px 0px -100px 0px",
		threshold: 1,
	});

	getH2.forEach((element) => {
		observer.observe(element);
	});
}

// This function handles clicks on links and scrolls to the appropriate section of the page.
function onDocumentClick(e) {
	if (e.target.tagName.toLowerCase() !== "a") {
		return;
	}

	const target = e.target;
	const hash = target.hash;

	if (!hash) {
		return;
	}
	e.preventDefault();
	onHashgGetId(hash);
}

// This function extracts the ID from the hash and scrolls to the corresponding element on the page.
function onHashgGetId(hash) {
	const stripHash = hash.replace(/^#/, "");
	const getMatchId = document.getElementById(stripHash);
	scrollToElement(getMatchId);
}

// This function scrolls smoothly to the specified element on the page.
function scrollToElement(element) {
	if (!element) {
		return;
	}

	element.scrollIntoView({ behavior: "smooth" });
}

// This function handles changes in the URL hash and scrolls to the appropriate section of the page.
function onHashChange() {
	onHashgGetId(location.hash);
}

document.addEventListener("DOMContentLoaded", onDocumentReady);
document.addEventListener("click", onDocumentClick);
window.addEventListener("hashchange", onHashChange);
