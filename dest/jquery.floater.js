/*! jquery.floater.js (git@github.com:oosugi20/jquery.floater.js.git)
* 
 * lastupdate: 2013-10-07
 * version: 0.1.1
 * author: Makoto OOSUGI <oosugi20@gmail.com>
 * License: MIT
 */
;(function ($, window, undefiend) {
'use script';

var MODULE_NAME = 'Floater';
var PLUGIN_NAME = 'floater';
var Module;


/**
 * Module
 */
Module = function (element, options) {
	this.el = element;
	this.$el = $(element);
	this.options = $.extend({
		position: 'bottom', // top | bottom
		hide_over: true,
		shift: 0
	}, options);
};

(function (fn) {
	/**
	 * init
	 */
	fn.init = function () {
		this._createClone();
		this.toFloat();
		this.hide();
		this._eventify();
	};

	/**
	 * _prepareElms
	 */
	fn._prepareElms = function () {
	};

	/**
	 * _eventify
	 */
	fn._eventify = function () {
		var _this = this;
		if (this.options.hide_over) {
			$(window).on('scroll', function () {
				if (_this.isDisplay()) {
					_this.hide();
				} else {
					_this.show();
				}
			});
		}
	};

	///**
	// * isOnOriginal
	// */
	//fn.isOnOriginal = function () {
	//	return ($(window).scrollTop() + this.$clone.position().top === this.$el.position().top);
	//};

	/**
	 * isOverOriginal
	 */
	fn.isOverOriginal = function () {
		return ($(window).scrollTop() + this.$clone.position().top >= this.$el.position().top);
	};

	/**
	 * isNotOverOriginal
	 */
	fn.isNotOverOriginal = function () {
		return ($(window).scrollTop() + this.$clone.position().top <= this.$el.position().top);
	};

	/**
	 * isDisplay
	 */
	fn.isDisplay = function () {
		var result;
		switch (this.options.position) {
			case 'top':
				result = this.isNotOverOriginal();
				break;
			case 'bottom':
				result = this.isOverOriginal();
				break;
		}
		return result;
	};

	/**
	 * _createClone
	 */
	fn._createClone = function () {
		this.$clone = this.$el.clone();
		this.$clone.appendTo('body');
	};

	/**
	 * toFloat
	 */
	fn.toFloat = function () {
		var shift = this.options.shift;
		switch (this.options.position) {
			case 'top':
				this.$clone.css({
					position: 'fixed',
					top: 0 + shift,
					left: 0,
					zIndex: 99999
				});
				break;
			case 'bottom':
				this.$clone.css({
					position: 'fixed',
					bottom: 0 + shift,
					left: 0,
					zIndex: 99999
				});
				break;
		}
	};

	/**
	 * show
	 */
	fn.show = function () {
		this.$clone.css({
			visibility: 'visible'
		});
	};

	/**
	 * hide
	 */
	fn.hide = function () {
		this.$clone.css({
			visibility: 'hidden'
		});
	};

})(Module.prototype);


// set jquery.fn
$.fn[PLUGIN_NAME] = function (options) {
	return this.each(function () {
		var module;
		if (!$.data(this, PLUGIN_NAME)) {
			module = new Module(this, options);
			$.data(this, PLUGIN_NAME, module);
			module.init();
		}
	});
};

// set global
$[MODULE_NAME] = Module;

})(jQuery, this);
