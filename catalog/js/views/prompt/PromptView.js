
/**
 *
 * @author Dhiraj Bodicherla <dhiraj.bodicherla@knolskape.com>
 *
 * @version $Id$
 * @copyright KNOLSKAPE Solutions PVT LTD
 * @since 6 August, 2012
 * @package default
 **/

/**
 * File description
 **/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!js/templates/prompt/PromptTpl.tpl'
    ], function ($, _, Backbone, UnderConstructionTemplate) {

	var PromptView = Backbone.View.extend({

		className: 'prompt span3 editor-container well inactive',

		template: _.template(UnderConstructionTemplate),

		initialize: function () {

			_.bindAll(this, 'show',
				'onProceed',
				'onCancel');

			this.render();
		},

		render: function () {

			this.$el.html(this.template({
				message: ''
			}));

			$('body').append(this.$el);
		},

		show: function (obj) {

			var self = this;
			var x, y;

			if (obj.event.pageX || obj.event.pageY) {
				x = obj.event.pageX;
				y = obj.event.pageY;
			} else {
				x = obj.event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				y = obj.event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}

			x -= $(this.$el).width();
			y += 10;

			this.$el.html(this.template({
				message: obj.message
			}));

			this.$el.css({
				top: y + 'px',
				left: x + 'px'
			});

			this.$el.removeClass('inactive').addClass('active');
			this.proceedHandler = obj.yes;
			this.cancelHandler = obj.no;
		},

		events: {
			'click #alert_proceed_btn': 'onProceed',
			'click #alert_cancel_btn': 'onCancel'
		},

		onProceed: function () {
			this.proceedHandler();
			this.$el.removeClass('active').addClass('inactive');
		},

		onCancel: function () {
			this.cancelHandler();
			this.$el.removeClass('active').addClass('inactive');
		}
	});

	return PromptView;
});