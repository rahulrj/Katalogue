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
	'text!com/knolskape/social_logins/js/templates/OpenIDTpl.tpl'
	], function($, _, Backbone, OpenIDTemplate) {

	var OpenIDView = Backbone.View.extend({
		
		tagName: 'p',
		
		template: _.template( OpenIDTemplate ),

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html( this.template() );
		},

		events: {
			'click .openid': 'openLoginWindow'
		},

		openLoginWindow: function (e) {

			var loginWindow = window.open('com/knolskape/social_logins/php/openid-login.php','','width=400,height=500');
			var that = this;

			KAPP.loginHandler = function (obj) {

				Backbone.trigger('login:loginUser',{
					username : obj.attributes['contact/email'],
					email : obj.attributes['contact/email'],
					password: '',
					social_method : '5',
					social_id : obj.identity.data.openid_identity
				});

				KAPP.loginHandler = {};
			};
		}
	});
	
	return OpenIDView;
});