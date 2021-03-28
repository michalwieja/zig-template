<?php

/**
 * Remove empty paragraphs created by wpautop()
 * @author Ryan Hamilton
 * @link https://gist.github.com/Fantikerz/5557617
 */
function remove_empty_p( $content ) {
	$content = force_balance_tags( $content );
	$content = preg_replace( '#<p>\s*+(<br\s*/*>)?\s*</p>#i', '', $content );
	$content = preg_replace( '~\s?<p>(\s|&nbsp;)+</p>\s?~', '', $content );
	return $content;
}
add_filter('the_content', 'remove_empty_p', 20, 1);


function custom_theme_setup() {
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'custom-logo' );

	register_nav_menus( array(
		'primary' => __( 'Primary Menu' )
	) );
}

add_action( 'after_setup_theme', 'custom_theme_setup' );

function custom_menus() {
	$locations = array(
		'primary' => 'Desktop primary menu',
		'footer'  => 'Footer menu'
	);
	register_nav_menus( $locations );
}

add_action( 'init', 'custom_menus' );


// Load scripts
function load_custom_scripts() {
	wp_enqueue_script(
		'custom-js',
		get_stylesheet_directory_uri() . '/js/index.js',
		array( 'jquery' ),
		filemtime( get_stylesheet_directory() . '/js/index.js' ),
		true
	);

	wp_enqueue_style(
		'custom-css',
		get_stylesheet_directory_uri() . '/style.css',
		null,
		filemtime( get_stylesheet_directory() . '/style.css' )
	);
}

add_action( 'wp_enqueue_scripts', 'load_custom_scripts', 100 );

function custom_widget_areas() {
	register_sidebar( array(
		'before_title'  => '',
		'after_title'   => '',
		'before_widget' => '',
		'after_widget'  => '',
		'name'          => 'Newsletter Area',
		'id'            => 'newsletter',
		'description'   => 'Newsletter widget area'
	) );
	register_sidebar( array(
		'before_title'  => '',
		'after_title'   => '',
		'before_widget' => '',
		'after_widget'  => '',
		'name'          => 'Footer Map Area',
		'id'            => 'footer_map',
		'description'   => 'Footer Map widget area'
	) );
	register_sidebar( array(
		'before_title'  => '',
		'after_title'   => '',
		'before_widget' => '',
		'after_widget'  => '',
		'name'          => 'Hero Social Area',
		'id'            => 'hero_social',
		'description'   => 'Hero Social widget area'
	) );
	register_sidebar( array(
		'before_title'  => '',
		'after_title'   => '',
		'before_widget' => '',
		'after_widget'  => '',
		'name'          => 'Footer Social Area',
		'id'            => 'footer_social',
		'description'   => 'Footer Social widget area'
	) );
}

add_action( 'widgets_init', 'custom_widget_areas' );
