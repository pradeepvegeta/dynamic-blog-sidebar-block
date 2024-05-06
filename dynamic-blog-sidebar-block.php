<?php

/**
 * Plugin Name:       Dynamic Blog Sidebar Block
 * Description:       To make navigating through the h2 tags on the page easier, dynamically get them from the post text.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            https://github.com/pradeepvegeta
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dynamic-blog-sidebar-block
 *
 * @package CreateBlock
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_dynamic_blog_sidebar_block_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'create_block_dynamic_blog_sidebar_block_block_init');

/**
 * The dynamic update of the ID to the H2 tags using HTML Tag Processor
 *
 * @param  string $block_content
 * @param  array $block_content
 * @see https://developer.wordpress.org/reference/hooks/render_block_this-name/
 * @see https://developer.wordpress.org/reference/classes/wp_html_tag_processor/
 */
function add_id_to_heading_block_level_two($block_content, $block)
{
	if (isset($block['attrs']) && !empty($block['attrs'])) {
		return $block_content;
	}
	$strip_h2_tags = strtolower(trim(strip_tags($block_content)));
	$convert_id = str_replace(' ', '-', $strip_h2_tags);
	$block_content = new \WP_HTML_Tag_Processor($block_content);
	$block_content->next_tag();
	$block_content->set_attribute('id', $convert_id);
	$block_content->get_updated_html();

	return $block_content;
}

add_filter('render_block_core/heading', 'add_id_to_heading_block_level_two', 10, 2);
