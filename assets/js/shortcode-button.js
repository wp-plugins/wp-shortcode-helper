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

    /************************
        JSON-EDIT ACTIONS
    *************************/

    jQuery(document).on('click', '.remove_input_option', function() {
        jQuery(this).parents('.sh_option').remove();
        return false;
    });

    jQuery(document).on('click', '.remove_select_option', function() {
        jQuery(this).parents('.sh_select_option').remove();
        return false;
    });

    jQuery(document).on('click', '.delete_card', function() {
        jQuery(this).parents('.card.shortcode').remove();
        return false;
    });

    jQuery(document).on('click', '.add_input', function() {

        var input_div = jQuery(this).parents('.sh_input');
        var type = input_div.find('.options_select').val();
        var html = jQuery('.sh_'+type+'_default').html();

        input_div.find('.inputs').append(html);

        return false;
    });


    jQuery(document).on('click', '.add_select_option', function() {
        var input_div = jQuery(this).parent('.sh_input');
        var html = jQuery('.sh_select_option_default').html();


        input_div.append(html);

        return false;
    });

    jQuery(document).on('click', '.add_new_card', function() {
        var input_div = jQuery(this).parents('#sh_shortcode_form');
        var html = jQuery('.sh_card_default').html();


        jQuery(html).insertAfter(jQuery(this).parents('.card'));

        return false;
    });


    //create json-string
    jQuery(document).on('submit', '#sh_shortcode_form', function() {
        
        var form = jQuery(this);
        var data = new Array();

        form.find('.card.shortcode').each(function(e) {
            data[e] = {};
            var el = jQuery(this);

            data[e]['text'] = el.find('[name=text]').val();
            data[e]['value'] = el.find('[name=value]').val();

            if(el.find('[name=content]').val() == 'true') {
                data[e]['content'] = true;
            }
            

            if(el.find('[name=hideContentInput]').val() != 'false') {
                data[e]['hideContentInput'] = true;
            }
            
            if(el.find('[name=description]').val() == 'true') {
                data[e]['description'] = true;
            }
            //data[e]['description'] = el.find('[name=description]').val();
            data[e]['description_text'] = el.find('[name=description_text]').val();

            //inputs
            if(el.find('.inputs .sh_option').length > 0) {

                data[e]['options'] = {};

                el.find('.inputs .sh_option').each(function(f) {

                    data[e]['options'][f] = {};

                    var option = jQuery(this);

                    data[e]['options'][f]['type'] = option.find('[name=type]').val();
                    data[e]['options'][f]['name'] = option.find('[name=name]').val();
                    data[e]['options'][f]['label'] = option.find('[name=label]').val();

                    if(option.find('.sh_select_option').length > 0) {

                        data[e]['options'][f]['options'] = {};

                        option.find('.sh_select_option').each(function(b) {

                            var select_option_el = jQuery(this);

                            data[e]['options'][f]['options'][b] = {};

                            data[e]['options'][f]['options'][b]['text'] = select_option_el.find('[name=select_option_text]').val();
                            data[e]['options'][f]['options'][b]['value'] = select_option_el.find('[name=select_option_value]').val();


                        });

                    }

                });

            }
        });

        var jsonString = JSON.stringify(data);

        jQuery('#sh_jsonResult').val(jsonString).show();

        return false;
    });


    jQuery('.sh_tabs_list a').click(function() {
        var tab = jQuery(this).attr('href');

        jQuery('.sh_tabs_list a.active, .sh_tab.active').removeClass('active');

        jQuery(tab).addClass('active');
        jQuery(this).addClass('active');

        return false;
    });

    
});