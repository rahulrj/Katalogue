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
 * File description
 **/

define([
	'jquery',
	'underscore',
	'backbone'
	], function ($, _, Backbone) {

	var FacebookModel = Backbone.Model.extend({

		defaults: {
			api_key: null,
			FB : null
		},

		initialize: function () {
			
			_.bindAll(this, 'login',
							'updateStatusChange',
							'getAboutMe',
							'logout',
							'update_activity');
			
			(function (d) {
				var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
				if (d.getElementById(id)) {return;}
				js = d.createElement('script'); js.id = id; js.async = true;
				js.src = "//connect.facebook.net/en_US/all.js";
				ref.parentNode.insertBefore(js, ref);
			} (document));
			
			var self = this;

			window.fbAsyncInit = function () {

				FB.init({
					appId		: self.get('api_key'), // App ID
					channelUrl	: '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
					status		: false, // check login status
					cookie		: true, // enable cookies to allow the server to access the session
					xfbml		: true,  // parse XFBML
					oauth		: true
				});

				FB.getLoginStatus(function (response) {
					self.set({
						FB : FB
					});
				});
			};
		},

		updateStatusChange: function (response) {

			if (response.status === 'connected') {
				//button.hide();
				this.getAboutMe();
			} else {
				// empty block
			}
		},

		login: function () {

			var that = this;

			FB.login(function (response) {
				if (response.status === 'connected') {
					that.getAboutMe();
				} else {
					// empty block
				}
			}, {scope: 'email'});
		},

		logout: function () {

			var that = this;

			FB.logout(function (response) {
				Backbone.trigger('logoutUser');
			});
		},

		getAboutMe: function () {

			var that = this;

			FB.api('/me', function (user) {
				Backbone.trigger('login:loginUser',{
					username : user.name,
					email : user.email,
					password: '',
					social_method : '1',
					social_id : user.id
				});
			});
		},

		update_activity: function () {

			if (User.fbID === null || User.fbID === '') {

				// me failed, so wait for 2 seconds and ping again
				setTimeout(function () {
					this.getAboutMe();
				}, 2000);

			} else {

				$.ajax({
					type: 'POST',
					url: 'api/user/update-user-activity.php',
					data: data,
					success: function (response) {
						if (!response.success) {
							//alert("Something went wrong, please try reloading the page again");
						} else {
							//getAllCampaigns(data);
						}
					},
					dataType: 'JSON'
				});
			}
		}
	});

	return FacebookModel;
});