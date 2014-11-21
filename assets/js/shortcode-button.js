jQuery(document).ready(function () {

    //Get Shortcodes from JSON


    function getValues(editor) {
        var template_url = template_path.stylesheet_directory;
        var url = template_url + '/shortcodes.json';
        var values = [];

        jQuery.getJSON(url, function (data) {
            jQuery.each(data, function (key, val) {
                var list_el = {};

                //Input-Fields
                var body = [];

                //Attribute
                var attr = [];

                //Shortcode-Name
                var shortcode_name = val.value;

                //Hide Content Field
                var hideContentInput = val.hideContentInput;
                console.log(hideContentInput);

                //Options?
                var options;
                if (typeof val.options !== 'undefined') {
                    options = true;
                } else {
                    options = false;
                }

                //Content
                var content;
                if (val.content === true) {
                    content = true;
                } else {
                    content = false;
                }

                //Description
                var description;
                if (val.description === true) {
                    description = true;
                } else {
                    description = false;
                }

                //Load Input-Fields
                if (options) {
                    jQuery.each(val.options, function (key, val) {
                        if (val.type == 'select') {
                            var options_select = [];
                            //Gehe jede Option durch
                            jQuery.each(val.options, function (key, val) {
                                options_select.push({
                                    text: val.text,
                                    value: val.value
                                });
                            });
                            body.push({
                                type: 'listbox',
                                name: val.name,
                                label: val.label,
                                'values': options_select
                            });

                        } else if (val.type == 'textarea') {
                            body.push({
                                type: 'textbox',
                                multiline: true,
                                minWidth: 300,
                                minHeight: 100,
                                name: val.name,
                                label: val.label
                            });
                        } else if (val.type == 'media') {
                            body.push({
                                type: 'textbox',
                                name: val.name,
                                label: val.label,
                                classes: 'media_upload'
                            });
                        } else if(val.type == 'label') {
                            body.push({
                                type: 'label',
                                name: val.name,
                                text: val.text
                            });
                        } else {
                            body.push({
                                type: val.type,
                                name: val.name,
                                label: val.label
                            });
                        }

                        attr.push(val.name);
                    });
                }

                if (content === true && hideContentInput !== true) {
                    body.push({
                        type: 'textbox',
                        name: 'content',
                        label: 'Content',
                        multiline: true,
                        minWidth: 300,
                        minHeight: 100
                    });
                }
                if (description) {
                    body.push({
                        type: 'label',
                        name: 'description_headline',
                        text: 'Description',
                        style: 'font-size: 18px; font-weight: bold; margin-top: 10px; margin-bottom: 10px;'
                    });
                    body.push({
                        type: 'label',
                        name: 'description',
                        text: val.description_text,
                        style: 'height:auto !important;max-height:80px;max-width: 100%;word-wrap:break-word;overflow: scroll;white-space:normal;line-height: 16px !important;margin-top: 10px;',
                    });
                }

                //Listbox-Element Text
                list_el.text = val.text;

                //Listbox-Element Value
                list_el.value = val.value;

                //Listbox-Element Action
                list_el.onclick = function (e) {
                    editor.windowManager.open({
                        title: 'Shortcode: ' + val.text,
                        body: body,
                        onsubmit: function (e) {
                            var shortcode = '[' + shortcode_name;

                            if (options) {
                                jQuery.each(e.data, function (key, val) {
                                    if (key != 'content' && key != 'description' && key != 'description_headline') {
                                        shortcode += ' ' + key + '="' + val + '"';
                                    }
                                });
                            }


                            shortcode += ']';

                            //If content exists
                            if (content) {
                                if (typeof val.hideContentInput == 'undefined' || val.hideContentInput != 'true') {
                                    shortcode += e.data.content;
                                }
                                shortcode += '[/' + shortcode_name + ']';
                            }

                            editor.insertContent(shortcode);
                        }
                    });
                };

                values.push(list_el);
            });
        });


        return values;
    }

    if(typeof tinymce != 'undefined') {
        tinymce.PluginManager.add('shortcode_button', function (editor, url) {

            var values = getValues(editor);

            editor.addButton('shortcode_button', {
                title: 'Shortcodes',
                icon: 'lightbulb',
                type: 'menubutton',
                menu: values,
            });
        });
    }
    
    jQuery(document).on('click', '.mce-media_upload', function() {
        var input_field = jQuery(this);
        
        window.send_to_editor = function(html) {
            var image_url = jQuery('img',html).attr('src');
            input_field.val(image_url);
            tb_remove();
        }
        
        tb_show('Choose media', 'media-upload.php?referer=wptuts-settings&type=image&TB_iframe=true&post_id=0', false);
        jQuery('#TB_window').addClass('z_index');
        return false;
    });
    
    jQuery(document).on('click', '#TB_closeAjaxWindow', function() {
        tb_remove();
    });

    
});