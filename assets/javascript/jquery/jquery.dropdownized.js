/*
* Select (Dropdown) Menu Replacement
*
* Copyright (c) 2010
* Jozef Selesi & Ivan Tatic (ivan@simplified.me)
* Dual licensed under the MIT and GPL licenses.
* Uses the same license as jQuery, see:
* http://jquery.org/license
*
* @version 0.1
*/
;(function($) {
    var options = {
    };

    $.fn.dropdownized = function(options) {
        var opts = $.extend({}, $.fn.dropdownized.defaults, options);

        return this.each(function(i) {
            // Hides select field
            $(this).attr('style', ' -moz-opacity:0; filter:alpha(opacity=0); opacity:0;');

            // HTML
            $(this).wrap('<div id="dropdownized-'+i+'" class="ui-dropdownized" />').before('<div>Dropdownized initialized</div>');
            $(this).parent().css({
                cursor: 'pointer',
                position: 'relative',
                zIndex: 1
            });

            // Getting options and parent sizes
            if(opts.fixed === true){
                // Parent elements needs to have specific
                var dropdownizerHolderHeight = $(this).parent().height();
                var dropdownizerHolderWidth = $(this).parent().width();
            } else {
                var dropdownizerHolderHeight = $(this).height();
                var dropdownizerHolderWidth = $(this).width();

                $('#dropdownized-'+i).width(dropdownizerHolderWidth).height(dropdownizerHolderHeight);
                $('#dropdownized-'+i).find('div').css({
                    top: 0,
                    left: 0,
                    display: 'block',
                    position: 'absolute',
                    lineHeight: dropdownizerHolderHeight+'px',
                    width: dropdownizerHolderWidth,
                    height: dropdownizerHolderHeight
                });
            }

            normalDropDrown(this, i, dropdownizerHolderWidth, dropdownizerHolderHeight, opts);
        });
    };

    function normalDropDrown(e, uID, eWidth, eHeight, opts){
        // Setting select CSS properties
        $(e).css({
            display: 'inline',
            position: 'absoulte',
            cursor: 'pointer',
            float: 'left',
            left: 0,
            top: 0,
            height: eHeight,
            width: eWidth,
            margin: 0,
            padding: 0,
            backgroundColor: 'transparent',
            zIndex: '5'
        });

        // Get initial value of dropdown
        $(e).each( function(){
            var dropdownValue = $(this).find(":selected").text();
            if($.trim(dropdownValue).length != ""){
                $(this).siblings("div").html(dropdownValue);
            } else {
                $(this).siblings("div").html(opts.noValue);
            }
        });

        // Gets value of selected option
        $(e).change(function() {
             $(this).siblings("div").html($(this).find(":selected").text());
        });

        // Adds hover class (mostly to satisfy IE users)
        $(e).parent().hover(
            function() { $(this).addClass(opts.hover);},
            function() { $(this).removeClass(opts.hover);}
        );
    };

    // Default options
    $.fn.dropdownized.defaults = {
        fixed: true,            // Sets script to be fluid or fixed
        hover: 'hover',         // Name of the hover class
        noValue: 'Select...'    // Default placeholder text
    };
})(jQuery);
