<?php
/*
Plugin Name: WordPress Shortcode-Helper
Author: Yanik Peiffer
Version: 1.1

Makes the usage of Shortcodes for Clients easier.

This plugin creates a dropdown-menu in the wysiwyg-editor of wordpress, alos known as TinyMCE. You create a JSON-file with all the settings for each shortcode, and the user of the backend just sees a simple button where he can choose one of the possible shortcodes.

A popup asks you to enter every attribute the shortcode needs and at the end, the correct shortcodes get copied to the textarea.

Features:

* Simple Frontend
* Use your own shortcodes
* add or delete shortcodes any time
* easy use of attributes
* any typing errors


Installation:

Download the ZIP-File and extract it to your computer. Than upload it via FTP to your plugins-folder of WordPress (wp-content/plugins).
In your WordPress-Backend you have to activate the plugin.
Last step is to create the JSON-File in your template-folder. Create a new folder called 'shortcodes' and then create a file called 'shortcodes.json'. You can also copy the example-file included in the download.
After that, all is set up and you can see the plugin in action when you edit or create a new post/page.

*/

//require('assets/php/update-notifier.php');

add_action('admin_head', 'add_tinymce_button');
function add_tinymce_button() {
    global $typenow;
    if ( !current_user_can('edit_posts') && !current_user_can('edit_pages') ) {
   	return;
    }
    if( ! in_array( $typenow, array( 'post', 'page' ) ) )
        return;
  	if ( get_user_option('rich_editing') == 'true') {
  		add_filter("mce_external_plugins", "add_plugin");
  		add_filter('mce_buttons', 'register_button');
  	}
}

//Button-Script
function add_plugin($plugin_array) {
   	$plugin_array['shortcode_button'] = plugins_url( '/assets/js/shortcode-button.js', __FILE__ );
   	return $plugin_array;
}

//Adds the Button
function register_button($buttons) {
   array_push($buttons, "shortcode_button");
   return $buttons;
}


//Template-Path
function localize_vars() {
    return array(
        'stylesheet_directory' => get_stylesheet_directory_uri()
    );
}

wp_enqueue_script( 'shortcode_script', plugins_url( 'shortcode-helper/assets/js/shortcode-button.js' ), array( 'jquery' ) );
wp_localize_script( 'shortcode_script', 'template_path', localize_vars() );

?>