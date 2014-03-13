/**
 * @author: Anjaneyulu Reddy BEERAVALLI <anji.reddy@knolskape.com>
 *
 * @since: 18 Jan, 2013
 * @file: LoginModel.js
 *
 * @copyright: KNOLSKAPE Solutions Pvt Ltd
 **/

 /**
 * FILE DESCRIPTION
 *
 * The following operations are handled in this file:
 *		- login user - social login / traditional method
 *		- logout user - delete cookies
 **/
 
define([
	'jquery',
	'underscore',
	'backbone',
	'com/knolskape/login/js/util/util'
	], function ($, _, Backbone, Util) {

	var LoginModel = Backbone.Model.extend({

		id: 'loginModel',

		urlRoot: 'com/knolskape/login/api/action',
		
		defaults: {
			id						: null,
			email					: 'email',
			password				: 'password',
			social_method			: null,
			social_id				: null,
			username				: null
		},

		initialize: function () {

			_.bindAll( this, 'loginUser');

			Backbone.on('login:loginUser', this.loginUser, this);
		},

		loginUser: function (user) {

			var that = this;
			KAPP.loading.show();
			user.id = null;

			that.save(user, {

				success: function (model, response) {

					KAPP.processResponse( response );

					if ( response.error_code === 0 ) {
						Backbone.trigger('onLoginSuccess', model);
					}
					else {
						/**
						 * error_code details:
						 * - 400: Request pending
						 * - 401: username / password combination failed
						 * - 402: user not registered
						 */

						Backbone.trigger('loginActionMessageDisplay', response.message);
						KAPP.loading.hide();
					}
				},

				error: function (model, response) {
					
					KAPP.showErrorMessage('Failed to save user to local database');
				}
			});
		}
	});

	return LoginModel;
});