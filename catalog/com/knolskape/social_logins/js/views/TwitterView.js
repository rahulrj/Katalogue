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
	'text!com/knolskape/social_logins/js/templates/TwitterTpl.tpl'
	], function ($, _, Backbone, TwitterTemplate) {

		var TwitterView = Backbone.View.extend({
			
			tagName: 'p',
			
			template: _.template(TwitterTemplate),

			initialize: function () {
				this.render();
			},

			render: function () {
				this.$el.html(this.template());
			},

			events : {
				"click #twt-login-btn": "twitterLogin"
			},

			twitterLogin: function () {
				this.model.login();
			}
		});
		
		return TwitterView;
});