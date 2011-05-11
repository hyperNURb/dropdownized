/*
* Select (Dropdown) Menu Replacement
*
* Copyright (c) 2010
* Jozef Selesi & Ivan Tatic (ivan@simplified.me)
* Dual licensed under the MIT and GPL licenses.
* Uses the same license as jQuery, see:
* http://jquery.org/license
*
* @version 0.3c
*/
;(function($) {
    var options = {
    };

    var methods = {
        _init :        function(elem, i, browserSupport, elemClass, fluid) {
                            elem.data({'drpdwnInit': true})
                                .attr('style', ' -moz-opacity:0; filter:alpha(opacity=0); opacity:0; filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);')
                                .css({
                                    display: 'block',
                                    opacity: 0,
                                    position: 'absoulte',
                                    cursor: 'pointer',
                                    'float': 'left',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    right: 0,
                                    height: '100%',
                                    width: '100%',
                                    margin: 0,
                                    padding: 0,
                                    backgroundColor: 'transparent',
                                    zIndex: 5
                                })
                                .wrap('<div id="dropdownized-'+i+'" class="'+ browserSupport +' '+ elemClass +'" />')
                                .removeClass()
                                .before('<div>Dropdownized initialized</div>')
                                .parent().css({
                                    cursor: 'pointer',
                                    position: 'relative',
                                    zIndex: 1
                            });
                            elem.siblings('div').css({
                                    position: 'absolute',
                                    cursor: 'pointer',
                                    display: 'block',
                                    left: 0,
                                    top: 0,
                                    zIndex: -1,
                                    overflow: 'hidden',
                                    lineHeight: elem.parent().height()+'px'
                            });

                            if ( fluid ) {
                                drpdwnWidth = parseInt(elem.width()) + parseInt(elem.siblings('div').css('padding-right')) +'px';
                                $('#dropdownized-'+i).width( drpdwnWidth );
                            }
        },
        _remove :       function(elem){
                            return elem.data({'drpdwnInit': false}).unwrap().siblings("div").remove();
        },
        update :        function(elem) {
                            return elem.siblings("div").html(methods.gettext(elem));
        },
        setvalue :      function(elem, val) {
                            return elem.siblings("div").html(val);
        },
        gettext :       function(elem) {
                            return elem.find(":selected").text();
        },
        getvalue :      function(elem) {
                            return elem.val();
        },
        setCalledValue : function(elem, value) {
                            return elem.val(value).attr('selected', 'selected');
        }
    };

    // Debugging
    function debug($obj) {
        if (window.console && window.console.log) {
            window.console.log('[dropdownized]: '+$obj);
        }
    }


    $.fn.dropdownized = function(options) {
        var opts = $.extend({}, $.fn.dropdownized.defaults, options);
        // Adds fallback class to IE6
        var browserSupport = ( $.browser.msie && $.browser.version=="6.0" ) ? "ui-dropdownized fallback" : "ui-dropdownized";

        return this.each(function(i) {
            var elem = $(this);
            var elemClass = this.className.length ? this.className : "";

            if (opts.change === undefined || opts.change === null) opts.change = function(){};

            // Check if element is select
            if( this.length && this.tagName === "SELECT" ) {
                if( opts.reload === true )
                    methods._remove(elem);

                if( opts.set != null )
                    methods['update'].apply(elem, [elem, methods.setCalledValue(elem, opts.set)]);

                if( elem.data('drpdwnInit') != true ) {

                    // Initialize script [build HTML elements]
                    methods._init(elem, i, browserSupport, elemClass, opts.fluid);

                    // Set default values or placeholder
                    (( $.trim(methods.getvalue(elem)) != "" ) && ( $.trim(methods.gettext(elem)).length > 0 )) ? methods.update(elem) : methods.setvalue(elem, opts.placeholder);

                    // Gets value of selected option
                    elem.bind('change keyup', function() {
                        if ( methods.gettext(elem) == "" ||  methods.gettext(elem) == null )
                            methods['setvalue'].apply(elem, [elem, opts.placeholder, opts.change($(this))]);
                        else
                            methods['update'].apply(elem, [elem, opts.change($(this))]);
                    });

                    // Hover class
                    elem.parent()
                        .hover(
                            function() { $(this).addClass(opts.hover);},
                            function() { $(this).removeClass(opts.hover);}
                        )
                        .focusin( function() { $(this).addClass(opts.hover); })
                        .focusout( function() { $(this).removeClass(opts.hover);});
                } else {
                    // Library is already initialized
                    debug('Already initialized! Yay!');
                }
            } else {
                // Use it only on SELECT elements
                debug('No luck, sigh...');
            }
        });
    };

    // Default options
    $.fn.dropdownized.defaults = {
        fixed: true,              // Sets script to be fluid or fixed
        reload: false,            // If dynamic update is needed
        set: null,                // Updates element value
        fluid: true,              // If true, gets dropdown auto width
        hover: 'hover',           // Name of the hover class
        active: 'active',         // Name of the active class
        change: null,             // Callback on change event
        placeholder: 'Select...'  // Default placeholder text
    };
})(jQuery);
