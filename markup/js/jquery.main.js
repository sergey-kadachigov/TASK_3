jQuery(function () {
    initMyTabs();
});

function initMyTabs() {
    var select = jQuery('#select');
    jQuery('.tabs-link-wrap').myTabs({
        activeBtn: 'li',
        onInit: function (self) {
            select.on('change', function () {
                self.options.currentIndex = this.selectedIndex - 1;
                self.openTab();
            })
        },
        onChange: function (self) {
            select.get(0).selectedIndex = self.options.currentIndex + 1;
        }
    });
    jQuery('.tabs-radio-wrap').myTabs({
        btnEvent: 'change'
    });
    jQuery('.tabs-check-wrap').myTabs({
        btnEvent: 'change'
    });
};


//initOpenPanel
;(function ($) {
    function MyTabs(options) {
        this.options = $.extend({
            holder: '.tabs-wrap',
            allTabs: '.tab',
            tabWrap: '.tab-wrap',
            btn: '.tab-btn',
            activeBtn: false,
            activeClass: 'active',
            check: 'checked',
            btnEvent: 'click',
            currentIndex: ''
        }, options);
        this.init();
    };
    MyTabs.prototype = {
        init: function () {
            if (this.options.holder) {
                this.findElements();
                this.attachEvents();
                this.startTab();
                this.myCallback('onInit', this);
            }
        },
        findElements: function () {
            this.holder = $(this.options.holder);
            this.btnWrap = this.holder.find(this.options.btnWrap);
            this.btns = this.holder.find(this.options.btn);
            this.tabWrap = this.holder.find(this.options.tabWrap);
            this.allTabs = this.tabWrap.find(this.options.allTabs);
            this.activeItems = this.searchActive();
        },
        attachEvents: function () {
            var self = this;
            this.btns.on(this.options.btnEvent, function (e) {
                e.preventDefault();
                var thisIndex = self.btns.index($(this));
                if (thisIndex === self.options.currentIndex) {
                    self.closeTab();
                } else {
                    self.options.currentIndex = thisIndex;
                    self.openTab();
                }
                self.myCallback('onChange', self);
            });
        },
        searchActive: function () {
            return this.options.activeBtn ? this.btns.parent(this.options.activeBtn) : this.btns;
        },
        openTab: function () {
            this.activeTab = this.tabWrap.find($(this.btns[this.options.currentIndex]).attr('href') || $(this.btns[this.options.currentIndex]).val());
            this.activeItems.removeClass(this.options.activeClass);
            $(this.activeItems[this.options.currentIndex]).addClass(this.options.activeClass);
            this.allTabs.removeClass(this.options.activeClass);
            $(this.activeTab).addClass(this.options.activeClass);
            $(this.btns.prop(this.options.check, false));
            if (this.options.currentIndex + 1) $(this.btns.get(this.options.currentIndex)).prop(this.options.check, true);
        },
        closeTab: function () {
            this.activeItems.removeClass(this.options.activeClass);
            this.allTabs.removeClass(this.options.activeClass);
            this.options.currentIndex = '';
        },
        startTab: function () {
            this.options.currentIndex = this.activeItems.index(this.holder.find('.' + this.options.activeClass));
            this.openTab();
        },
        myCallback: function (name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        },
        destroy: function () {
            this.btns.off(self.options.btnEvent);
            this.activeItems.removeClass(this.options.activeClass);
            this.allTabs.removeClass(this.options.activeClass);
            this.options.currentIndex = '';
        }
    };
    // jquery plugin
    $.fn.myTabs = function (opt) {
        return this.each(function () {
            $(this).data('MyTabs', new MyTabs($.extend({
                holder: this
            }, opt)));
        });
    };
}(jQuery));

