<?php
/*
Plugin Name: WP EventBird
Description: Gutenburg-ready support for event post types
Version:     1
Author:      Michael Savchuk
License:     MIT
Text Domain: ebird
*/

defined( 'ABSPATH' ) or die('🐦');

// --- Blocks --- //
function ebird_blocks() {

	wp_register_script(
		'wp-eventbird-date-block',
		plugins_url('dist/blocks/date/wp-eventbird-date.js', __FILE__),
		array('wp-blocks', 'wp-element')
	);

	wp_register_style(
		'wp-eventbird-date-block',
		plugins_url('dist/blocks/date/wp-eventbird-date.css', __FILE__),
		array('wp-edit-blocks'),
		filemtime(plugin_dir_path(__FILE__) . 'dist/blocks/date/wp-eventbird-date.css')
	);

	register_block_type('eventbird/date', array(
		'editor_script' => 'wp-eventbird-date-block',
		'style'  => 'wp-eventbird-date-block'
	));

}

// --- Post Type --- //

function ebird_create_post_type() {
	register_post_type('event', array(
		'labels' => array(
			'name'          => __('Events'),
			'singular_name' => __('Event'),
			'add_new'       => _x('Add New', 'event'),
			'add_new_item'  => __('Add New Event')
		),
		'public' => true,
		'has_archive' => true,
		'menu_postition' => 20,
		'menu_icon' => 'dashicons-calendar-alt',
		'show_in_rest' => true,
		'template' => array(
			array('core/heading', array(
				'placeholder' => 'Add author...'
			)),

			array('core/paragraph', array(
				'placeholder' => 'Add description...'
			))
			),
			'template_lock' => 'all'
	));
}

// --- Actions --- //
add_action('init', 'ebird_blocks');
add_action('init', 'ebird_create_post_type');