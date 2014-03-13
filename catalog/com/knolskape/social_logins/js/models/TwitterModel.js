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

	var TwitterModel = Backbone.Model.extend({

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
			return "http://platform.twitter.com/anywhere.js?id=" + this.get('api_key') + "&v=1";
		},

		initialize: function () {
			
			var that = this;

			_.bindAll(this, "login");
			
			//this.delegateGlobalEvents();
			this.fetch({
				success: function (model, response) {
					twttr.anywhere(function (T) {
						T.bind("authComplete", function (e, user) {
							// triggered when auth completed successfully
							Backbone.trigger('login:loginUser', {
								username : user.name,
								email : '',
								password: '',
								social_method : '2',
								social_id : user.id
							});
						});

						T.bind("signOut", function (e) {
							// triggered when user logs out
						});
					});
				}
			});
		},

		login: function () {
			twttr.anywhere(function (T) {
				T.signIn({ size: "small" });
			});
		},

		logout: function(){
			twttr.anywhere.signOut();
		}
	});

	return TwitterModel;
});