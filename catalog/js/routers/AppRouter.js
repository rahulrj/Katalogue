/**
 *
 * @author Dhiraj Bodicherla <dhiraj.bodicherla@knolskape.com>
 *
 * @version 1
 * @copyright KNOLSKAPE Solutions PVT LTD
 * @since 23 July, 2012
 * @package default
 **/

/**
 * Application routes are registered here
 **/

define([
	'jquery',
	'underscore',
	'backbone',
	'com/knolskape/login/js/views/LoginView',
	'js/views/base/BaseView',
	'js/views/header/HeaderView',
	'js/models/user/UserModel',
	'js/models/header/HeaderModel',
	'com/knolskape/login/js/models/LoginModel',
	'js/util/Util'
	], function ($, _, Backbone, LoginView, BaseView, HeaderView,
		UserModel, HeaderModel, LoginModel, Util) {

	var AppRouter = Backbone.Router.extend({

		routes: {
			''		: 'showHomeScreen',
			'home'	: 'showHomeScreen',
			'login'	: 'showLoginScreen'
		},

		initialize: function () {

			_.bindAll(this, 'before',
							'initHeaderView',
							'showHomeScreen',
							'showLoginScreen',
							'initApplication',
							'initOnUserAuthSuccess');
			
			this.onSuccesNavigateTo = 'home';
			this.isAppIniatilized	= false;
			this.locationHash		= window.location.hash;
		},

		before: function (callback) {

			if (this.isAppIniatilized === false) {
				this.authUser(callback);
			}
			else {

				var locationHash = window.location.hash;

				// FIXME: To avoid showing login screen when navigated to #login using back button
				// check if this can be improved
				if (KAPP.user && KAPP.user.get('user_id') !== null && locationHash === '#login') {
					return false;
				}
				else {
					if (callback) callback();
				}
			}
		},

		authUser: function (callback) {

			// store user requested location
			// Example: http://live.knolskape.com/cqt/#dashboard
			var self = this;

			if (!KAPP.user || (KAPP.user && KAPP.user.get('user_id') === null)) {

				KAPP.user = new UserModel();
				KAPP.user.updateURLRoot();

				/*
				 * HTTP request to check if user's session is active
				 * KNOLSKAPE's State code legend:
				 *	100: Active session, approved to use the application -> take to requested page
				 *  101: No active session -> take to login
				 *  102: Active session, user not approved -> take to login or display "contact adminstrator" message
				 *  103: Active session, user does not exist in the records - ideally this is not possible -> take to login
				 **/
				KAPP.user.fetch({

					success: function (model, response, options) {

						KAPP.processResponse(response);
						self.initApplication();

						if (response.state === 100) {

							// set user_id
							KAPP.user.set({ user_id: model.get('id')});
							self.initOnUserAuthSuccess(callback);
						}
						else {
							// explicitly call showLoginScreen because
							// if locationHash == login
							// navigate trigger does not work
							self.navigate('login', { trigger: false }); // take to login
							self.showLoginScreen();
						}
					},

					error: function (model, xhr, options) {

						KAPP.showErrorMessage('HTTP request error user fetch');
					}
				});
			}
		},

		initApplication: function () {

			// base view to handle 'body' level events
			this.baseView = new BaseView();
			$('#root').html(this.baseView.el);

			// for easy access
			this.mainContainer		= $('#mainContainer');
			this.headerContainer	= $('#headerContainer');
			this.footerContainer	= $('#footerContainer');

			// set application initialized boolean
			this.isAppIniatilized = true;
		},

		initOnUserAuthSuccess: function (callback) {

			// init all the pre requisite views for your application
			this.initHeaderView();

			// remove login view
			if (this.loginView) {
				this.loginView.remove();
			}

			if (this.locationHash === '#login') {
				/**
				 * User requested for login page - but has active session and is valid user
				 * Navigate user to the default page of the application
				 * example: facebook.com redirect to home page, if user is already logged in and requests facebook.com
				 **/
				this.navigate(this.onSuccesNavigateTo, { trigger: true });
			}
			else if (!callback) {
				/**
				 * initOnUserAuthSuccess is called from BaseView
				 * after login is success, server the page requested
				 */
				this.navigate(this.locationHash, { trigger: true });
			}
			else {
				if (callback) callback();
			}
		},

		initHeaderView: function() {

			if (this.headerView === undefined) {

				this.headerView = new HeaderView({ model: new HeaderModel() });
			}

			this.headerContainer.html(this.headerView.el);
		},

		showLoginScreen: function () {

			var self = this;

			this.before(function () {

				if (KAPP.user !== null) {
					Util.deleteCookie(KAPP.user.toJSON().hash);
				}

				var loginModel = new LoginModel({
						social_logins: [
							'facebook',
							'linkedin',
							'google',
							'openid'
						]
					});

				self.loginView = new LoginView({ model: loginModel });
				self.mainContainer.html(self.loginView.el);
			});
		},

		showHomeScreen: function () {

			var self =  this;

			this.before(function () {

				// TODO: Dispaly your home page here
				alert('Login Successfull');
			});
		}
	});
	
	return AppRouter;
});