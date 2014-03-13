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
	'text!com/knolskape/social_logins/js/templates/GoogleTpl.tpl'
	], function ($, _, Backbone, GoogleTemplate) {

	var GoogleView = Backbone.View.extend({
		
		tagName: 'p',
		
		template: _.template(GoogleTemplate),

		initialize: function () {

			_.bindAll(this,'render','openLoginWindow');

			this.render();
		},
		
		render: function () {
			this.$el.html(this.template());
		},

		events: {
			'click .google' : 'openLoginWindow'
		},

		openLoginWindow: function (e) {

			var identifier = $(e.currentTarget).data('identifier');
			var that = this;
			var loginWindow = window.open('./com/knolskape/social_logins/php/openid-login.php?openid_id=' + identifier,'','width=400,height=500');
			
			KAPP.loginHandler = function (obj) {

				Backbone.trigger('login:loginUser',{
					username		: obj.attributes['contact/email'],
					email			: obj.attributes['contact/email'],
					password		: '',
					social_method	: '4',
					social_id		: obj.identity.data.openid_identity
				});

				KAPP.loginHandler = {};
			};
		}
	});

	return GoogleView;
});