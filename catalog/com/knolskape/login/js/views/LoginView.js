/**
 * @author: Anjaneyulu Reddy BEERAVALLI <anji.reddy@knolskape.com>
 *
 * @since: 18 Jan, 2013
 * @file: LoginView.js
 *
 * @copyright: KNOLSKAPE Solutions Pvt Ltd
 **/

 /**
 * FILE DESCRIPTION
 *
 * View to dispaly traditional and social logins
 * All the social logins related plugins are loaded in this view.
 **/
 
define([
	'jquery',
	'underscore',
	'backbone',
	'com/knolskape/login/js/util/util',
	'text!com/knolskape/login/js/templates/LoginTpl.tpl',
	'com/knolskape/social_logins/js/models/SocialLoginsModel',
	'com/knolskape/social_logins/js/views/SocialLoginsView'
	], function ($, _, Backbone, Util, loginTemplate, SocialLoginsModel, SocialLoginsView) {

	var LoginView = Backbone.View.extend( {

		template: _.template( loginTemplate ),

		initialize: function () {

			_.bindAll(this, 'loginFormSubmit',
							'disableForm',
							'enableForm');
			this.render();
			this.emailInput = this.$('#emailInput');
			this.passwordInput = this.$('#passwordInput');

			this.model.on('loginActionMessageDisplay', this.loginActionMessageDisplay, this);
		},

		render: function () {

			this.$el.html(this.template());

			// $('#headerContainer').hide();

			var socialLoginsView = new SocialLoginsView({
				model: new SocialLoginsModel({
					social_logins: this.model.toJSON().social_logins
				})
			});

			this.$('#social_login_container').append(socialLoginsView.el);
		},

		events: {
			"click #login_form_btn": "loginFormSubmit",
			"click #forgotPassword": "forgotPassword"
		},

		loginFormSubmit: function (e) {

			e.preventDefault();
			this.$('#login_form_btn').button('loading');
			this.hideError();

			var em_val = $.trim(this.emailInput.val());
			var pwd_val = $.trim(this.passwordInput.val());

			if (em_val === null || em_val === "") {
				this.showError('Email field is required');
				return;
			}

			if (pwd_val === null || pwd_val === "") {
				this.showError('Password field is required');
				return;
			}

			this.disableForm();

			Backbone.trigger('login:loginUser', {
				username: '',
				email: this.emailInput.val(),
				password: this.passwordInput.val(),
				social_method: '6',
				social_id: ''
			});
		},

		loginActionMessageDisplay: function (message) {

			this.enableForm();
			this.showError(message);
			this.$('#login_form_btn').button('reset');
		},

		forgotPassword: function (e) {

			e.preventDefault();
		},

		hideError: function () {

			this.$('#loginErrorContainer').removeClass('kapp-cqt-show').addClass('kapp-cqt-hide').empty();
		},

		showError: function ( str ) {

			this.$('#loginErrorContainer').removeClass('kapp-cqt-hide').addClass('kapp-cqt-show').html(str);
		},

		disableForm: function () {

			this.emailInput.attr('disabled', 'disable');
			this.passwordInput.attr('disabled', 'disable');
			this.$('#login_form_btn').attr('disabled', 'disable');
		},
		
		enableForm: function () {

			this.emailInput.removeAttr('disabled');
			this.passwordInput.removeAttr('disabled');
			this.$('#login_form_btn').removeAttr('disabled');
		}
	});

	return LoginView;
});