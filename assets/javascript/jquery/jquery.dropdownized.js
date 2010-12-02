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

        return this.each(function() {
            // Hides select field
            $(this).attr('style', ' -moz-opacity:0; filter:alpha(opacity=0); opacity:0;');

            // HTML
            $(this).wrap('<div class="ui-dropdownized" />').before('<div>Hello</div>');
            $(this).parent().css({
                cursor: 'pointer',
                position: 'relative',
                zIndex: 1
            });

            // Getting parent div sizes so select box would be whole selectable
            var dropdownizerHolderHeight = $(this).parent().height();
            var dropdownizerHolderWidth = $(this).parent().width();

            normalDropDrown(this, dropdownizerHolderWidth, dropdownizerHolderHeight, opts.hover);
        });
    };

    function normalDropDrown(e, elWidth, elHeight, hover){
        // Setting select CSS properties
        $(e).css({
            display: 'inline',
            position: 'absoulte',
            cursor: 'pointer',
            float: 'left',
            left: 0,
            top: 0,
            height: elHeight,
            width: elWidth,
            margin: 0,
            padding: 0,
            backgroundColor: 'transparent',
            zIndex: '5'
        });

        $(e).each( function(){
            $(this).siblings('div').html($(this).find(":selected").text());
        });
         $(e).change(function() {
             $(this).siblings("div").html($(this).find(":selected").text());
        });

        $(e).parent().hover(
            function() { $(this).addClass(hover);},
            function() { $(this).removeClass(hover);}
        );
    };

    // Default options
    $.fn.dropdownized.defaults = {
        hover: 'hover',
        noValue: 'Select...'
    };
})(jQuery);
