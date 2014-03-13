/**
 *
 * @author Dhiraj Bodicherla <dhiraj.bodicherla@knolskape.com>
 *
 * @version $Id$
 * @copyright KNOLSKAPE Solutions PVT LTD
 * @since 28 July, 2012
 * @package default
 **/

/**
 * File description
 **/


define([
	'jquery',
	'underscore',
	'backbone',
	'text!js/templates/loading/LoadingTpl.tpl'
	], function ($, _, Backbone, LoadingTemplate) {

	var LoadingView = Backbone.View.extend({

		id: 'app_loading',

		className: 'app_loading_container',

		template: _.template(LoadingTemplate),

		initialize: function () {

			_.bindAll(this, 'show',
							'hide');
		},

		show: function () {

			this.$el.html(this.template());
			$('body').append(this.$el);
			this.$el.show();
		},

		hide: function (timeout) {
			this.$el.hide();
		}
	});

	return LoadingView;
});