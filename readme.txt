=== WordPress Shortcode-Helper ===
Donate link: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZU9TXHEWGX9EJ
Tags: shortcode, tinymce, button, helper, backend, javascript, popup
Requires at least: 3.9
Tested up to: 3.9.1
Stable tag: 1.0.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Make your shortcodes easy to use for everyone. Doesn't matter how many or how complex they are.

== Description ==

WordPress Shortcode-Helper is the best way to make your shortcodes easier for everyone. Developers know how many different shortcodes are needed developing a modern custom theme. Now the user does not have to read a whole guide before using their theme. They can select one of the available codes, enter the attributes via inputs and the complete code gets copied to the editor. 

Better for developers, better for users.

First, you activate the plugin and create a json-file in your template-folder. This file contains the information about every shortcode with its attributes and descriptions. Then, the plugin creates a dropdown in your editor with the list of all available codes. That's it!

Always check your json-file for validation-errors! http://jsonlint.com/

Sample json-file:

`
[{
		"text": "Button",
		"value": "btn",
		"content": true,
		"description": true,
		"description_text": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
		"options": [
			{
				"type": "textbox",
				"name": "href",
				"label": "URL"
			},
			{
				"type": "select",
				"name": "blank",
				"label": "New Tab",
				"options": [
					{
						"text": "No",
						"value": "no"
					},
					{
						"text": "Yes",
						"value": "yes"
					}
				]
			}
		]
	},

	{
		"text": "1/2 Column",
		"value": "one_half",
		"content": true,
		"description": true,
		"description_text": "Creates a 1/2 column",
		"options": [
			{
				"type": "select",
				"name": "position",
				"label": "Position",
				"options": [
					{
						"text": "First",
						"value": "first"
					},
					{
						"text": "Last",
						"value": "last"
					}
				]
			}
		]
	},

	{
		"text": "1/3 Column",
		"value": "one_third",
		"content": true,
		"description": true,
		"description_text": "Creates a 1/3-Column",
		"options": [
			{
				"type": "select",
				"name": "position",
				"label": "Position",
				"options": [
					{
						"text": "First",
						"value": "first"
					},
					{
						"text": "Last",
						"value": "last"
					}
				]
			}
		]
	},

	{
		"text": "2/3 Column",
		"value": "two_third",
		"content": true,
		"description": true,
		"description_text": "Creates a 2/3-Column",
		"options": [
			{
				"type": "select",
				"name": "position",
				"label": "Position",
				"options": [
					{
						"text": "First",
						"value": "first"
					},
					{
						"text": "Last",
						"value": "last"
					}
				]
			}
		]
	},

	{
		"text": "Tabwrapper",
		"value": "tabwrapper",
		"description": true,
		"content": true,
		"description_text": "Creates a Wrapper for Tabs"
	},

	{
		"text": "Tab",
		"value": "tab",
		"content": true,
		"description": true,
		"description_text": "Creates a Tab",
		"options": [
			{
				"type": "select",
				"name": "active",
				"label": "Active",
				"options": [
					{
						"text": "Yes",
						"value": "yes"
					},
					{
						"text": "No",
						"value": "no"
					}
				]
			},
			{
				"type": "textbox",
				"name": "title",
				"label": "Title"
			}
		]
	}]
`

Requires WordPress 3.9 and TinyMCE 4(automatically used by Wordpress 3.9)

Features:

*	Unlimited shortcodes
*	Comes without annoying standard shortcodes
*	choose your own description for every code
*	multiple input-fields for attributes


Comming soon

*	edit shortcodes using the WordPress backend
*	multilingual descriptions
*	better description
*	more input-fields

== Installation ==


1. Upload `Shortcode-Helper` to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Create the file 'shortcodes.json' in your template-folder
4. Copy the example-code to 'shortcodes.json' and edit it for your purpose

== Frequently Asked Questions ==

== Screenshots ==

1. Dropdown
2. Popup for attributes

== Changelog ==