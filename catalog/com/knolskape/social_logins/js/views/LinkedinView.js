/**
 *
 * @author Dhiraj Bodicherla <dhiraj.bodicherla@knolskape.com>
 *
 * @version $Id$
 * @copyright KNOLSKAPE Solutions PVT LTD
 * @since 18 July, 2012
 * @package default
 **/

/**
 * File description
 **/

define([
	'jquery',
	'underscore',
	'backbone',
	'text!com/knolskape/social_logins/js/templates/LinkedinTpl.tpl'
	], function ($, _, Backbone, LinkedinTemplate) {

	var LinkedinView = Backbone.View.extend({
		
		tagName: 'p',
					
		template: _.template(LinkedinTemplate),

		initialize: function () {
			this.render();
			this.model.on('change', this.modelChanged, this);
		},

		render: function () {

			this.$el.html(this.template());
		},

		events : {
			"click #linkedin-login-btn": "linkedinLogin"
		},

		modelChanged: function () {
			//alert('model changed');
		},

		linkedinLogin: function () {
			this.model.login();
		}
	});
	
	return LinkedinView;
});