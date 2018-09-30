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
add_action('init', 'ebird_create_post_type');