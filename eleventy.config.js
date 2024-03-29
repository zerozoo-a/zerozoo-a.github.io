const { DateTime } = require("luxon");
const markdownItAnchor = require("markdown-it-anchor");
const mk = require("@iktakahiro/markdown-it-katex");
const mu = require("markdown-it-textual-uml");
const schema = require("@quasibit/eleventy-plugin-schema");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

/**
 * plugis
 */

const pluginMermaid = require("@kevingimbel/eleventy-plugin-mermaid");
const pluginDrafts = require("./eleventy.config.drafts.js");
const pluginImages = require("./eleventy.config.images.js");
const pluginGetAllCategories = require("./eleventy.config.categories.js");
const pluginTOC = require("eleventy-plugin-toc");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const { execSync } = require("child_process");

/**
 * config
 */
/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	require("dotenv").config();
	eleventyConfig.addPassthroughCopy({
		"./public/": "/",
		"./favicon/": "/",
		"./public/css/gh-syntax.css": "/css/gh-syntax.css",
	});
	// eleventyConfig.addPassthroughCopy("./covers");
	eleventyConfig.addPassthroughCopy({
		"./sub_domains/web_gpu/dist/assets": "/sub_domains/web_gpu/assets",
	});

	eleventyConfig.addPlugin(schema);
	eleventyConfig.addPlugin(pluginRss, {
		posthtmlRenderOptions: {
			closingSingleTag: "default", // opt-out of <img/>-style XHTML single tags
		},
	});
	eleventyConfig.addLiquidFilter("dateToRfc3339", pluginRss.dateToRfc3339);

	// New in RSS 1.2.0
	eleventyConfig.addLiquidFilter("dateToRfc822", pluginRss.dateToRfc822);

	// ADD TOC
	eleventyConfig.addPlugin(pluginTOC);

	eleventyConfig.on("eleventy.after", () => {
		execSync(`npx pagefind --site _site --glob \"**/*.html\"`, {
			encoding: "utf-8",
		});
	});

	eleventyConfig.addGlobalData("env", process.env);

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

	// App plugins
	eleventyConfig.addPlugin(pluginMermaid, {
		// mermaid_js_src: "/js/mermaid/mermaid.esm.min.mjs",
		html_tag: "div",
		extra_classes: "graph",
	});
	eleventyConfig.addPlugin(pluginDrafts);
	eleventyConfig.addPlugin(pluginImages);
	eleventyConfig.addPlugin(pluginGetAllCategories);
	// Official plugins
	// eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 },
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginBundle);

	/**
	 * add filter
	 */

	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
			format || "dd LLLL yyyy"
		);
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
	});
	eleventyConfig.addFilter("iso8601", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if (!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if (n < 0) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	eleventyConfig.addFilter("tail", (array) => {
		if (!Array.isArray(array) || array.length === 0) {
			return [];
		}
		return array.slice(-1);
	});

	eleventyConfig.addFilter("isAvailable", (a) => {
		if (a) {
			return true;
		}
		return false;
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", (collection) => {
		let tagSet = new Set();
		for (let item of collection) {
			(item.data.tags || []).forEach((tag) => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	eleventyConfig.addFilter("getAllPosts", (collection) => {
		let tagSet = new Set();
		for (let item of collection) {
			(item.data.tags || []).forEach((tag) => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	eleventyConfig.addFilter("filterPostList", function filterPostList(posts) {
		return (posts || []).filter(
			(post) => ["all", "nav", "post", "posts"].indexOf(post) === -1
		);
	});

	// {{ collections | log }}
	eleventyConfig.addFilter("log", (a) => {
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
		console.log(a);
		// return a;
	});
	// {{ collections | keys }}
	eleventyConfig.addFilter("keys", (a) => {
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
		console.log(Object.keys(a));
		// return a;
	});

	// eleventyConfig.addFilter(
	// 	"foo",
	// 	/**
	// 	 *
	// 	 * @param {string} filePath
	// 	 */
	// 	function (filePath) {
	// 		const lastIndexOf = filePath.lastIndexOf("/");
	// 		const result = filePath.slice(0, lastIndexOf);
	// 		return result;
	// 	}
	// );
	/**
	 * @param {Array<any>} a
	 */
	eleventyConfig.addFilter("sortByDate", (/** @type {Array<any>} a */ a) => {
		if (!Array.isArray(a)) return a;
		return a.reverse();
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(
			(tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1
		);
	});

	// Customize Markdown library settings:
	eleventyConfig.amendLibrary("md", (mdLib) => {
		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: "after",
				class: "header-anchor",
				symbol: "#",
				ariaHidden: false,
			}),
			level: [1, 2, 3, 4],
			slugify: eleventyConfig.getFilter("slugify"),
		});
		mdLib.use(mk);
		mdLib.use(mu);
	});

	eleventyConfig.addCollection("myCustomSort", function (collectionApi) {
		return collectionApi
			.getAll()
			.filter((a) => a.inputPath.includes("blog"))
			.sort((a, b) => b.date - a.date);
	});

	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	return {
		// Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		templateFormats: ["md", "njk", "html", "liquid"],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

		// These are all optional:
		dir: {
			input: "content", // default: "."
			includes: "../_includes", // default: "_includes"
			data: "../_data", // default: "_data"
			output: "_site",
		},

		// -----------------------------------------------------------------
		// Optional items:
		// -----------------------------------------------------------------

		// If your site deploys to a subdirectory, change `pathPrefix`.
		// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

		// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
		// it will transform any absolute URLs in your HTML to include this
		// folder name and does **not** affect where things go in the output folder.
		pathPrefix: "/",
	};
};
