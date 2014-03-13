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
	'backbone'
	], function ($, _, Backbone) {

	var LinkedinModel = Backbone.Model.extend({

		defaults: {
			api_key: null
		},

		sync: function (method, model, options) {

			var params = _.extend({
				type: 'GET',
				dataType: 'jsonp',
				url: model.url(),
				processData: false
			}, options);

			return $.ajax(params);
		},

		url: function () {
			return "http://platform.linkedin.com/in.js?async=true";
		},

		initialize: function () {

			_.bindAll(this, 'onLinkedInAuth',
							'linkedinLoaded',
							'login');

			var that = this;

			this.fetch({
				success: function (model, response) {
					IN.init({
						api_key: that.get('api_key'),
						authorize: false,
						onLoad: that.linkedinLoaded()
					});
				}
			});
		},

		login: function () {

			if(!IN.User.isAuthorized()) {
				IN.User.authorize();
			}
		},

		logout: function () {
			IN.User.logout();
		},

		linkedinLoaded: function () {
			IN.Event.on(IN, 'auth', this.onLinkedInAuth, this);
		},

		onLinkedInAuth: function () {

			var that = this;

			IN.API.Profile("me").result(function (me) {

				Backbone.trigger('login:loginUser', {
					username : me.values[0].firstName + me.values[0].lastName,
					email : '',
					password: '',
					social_method : '3',
					social_id : me.values[0].id
				});
			});
		}
	});

	return LinkedinModel;
});