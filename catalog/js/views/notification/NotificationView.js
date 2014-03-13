/**
 *
 * @author Dhiraj Bodicherla <dhiraj.bodicherla@knolskape.com>
 *
 * @version $Id$
 * @copyright KNOLSKAPE Solutions PVT LTD
 * @since 13 September, 2012
 * @package default
 **/

/**
 * File description
 **/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!js/templates/notification/NotificationTpl.tpl'
	],function ($, _, Backbone, NotificationTemplate) {

	var NotificationView = Backbone.View.extend({

		id: 'notification_bar',

		className: 'navbar-fixed-top',

		template: _.template(NotificationTemplate),

		initialize: function () {

			_.bindAll(this, 'show', 'hide', 'close');

			this.timer = null;
			this.$el.html( this.template({msg: '', type: ''}) );

			$('body').append(this.$el);
		},

		events: {
			'click' : 'close'
		},

		show: function (msg, type, timeout){
			
			clearTimeout(this.timer);

			this.$el.html( this.template({msg: msg, type: type}) );
			this.hide(timeout);
		},

		hide: function (timeout) {

			var self = this;

			this.$el.slideDown('300', function () {
				self.timer = setTimeout(function () {
					self.close();
				}, timeout);
			});
		},

		close: function () {

			var self = this;
			clearTimeout(this.timer);
			
			this.$el.slideUp('300', function () {
				self.$el.hide();
			});
		}
	});
	
	return NotificationView;
});