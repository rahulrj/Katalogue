/**
 * 
 * @author Dhiraj Bodicherla <dhiraj.bodicherla@knolskape.com>
 * 
 * @version 
 * @copyright KNOLSKAPE Solutions PVT LTD
 * @since 18 July, 2012
 * @package default
 **/

/**
 * This is a view for Facebook model.
 **/

define([
	'jquery',
	'underscore',
	'backbone',
	'text!com/knolskape/social_logins/js/templates/FacebookTpl.tpl'
	], function ($, _, Backbone, FacebookTemplate) {

	var FacebookView = Backbone.View.extend({

		tagName: 'p',

		template: _.template(FacebookTemplate),

		initialize: function () {
			
			_.bindAll(this, 'render');
			
			//this.delegateGlobalEvents();
			this.render();
		},

		render: function () {
			this.$el.html(this.template());
		},

		events: {
			"click #fb-auth": "facebookAuthStart"
		},

		facebookAuthStart: function () {
			this.model.login();
		}
	});
	
	return FacebookView;
});