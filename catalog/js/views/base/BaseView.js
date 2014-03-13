/**
 * @author: Anjaneyulu Reddy BEERAVALLI <anji.reddy@knolskape.com>
 *
 * @since: 11 Jan, 2013
 * @file: BaseView.js
 *
 * @copyright: KNOLSKAPE Solutions Pvt Ltd
 **/

 /**
 * FILE DESCRIPTION
 *
 * BaseView is the first view of the application. All the other views are children to BaseView.
 * BaseView divides the page into three parts (3 divs): (check BaseTpl.tpl file)
 *		- Header (#headerContainer)
 *		- Main (#mainContainer)
 *		- Footer (#footerContainer)
 *
 * NOTE: If you want to make any other divisions, please add them to BaseTpl.tpl
 **/

define([
	'jquery',
	'underscore',
	'backbone',
	'text!js/templates/base/BaseTpl.tpl',
	'js/views/notification/NotificationView',
	'js/views/loading/LoadingView',
	'js/views/prompt/PromptView'
	], function ($, _, Backbone, BaseTemplate, NotificationView, LoadingView, PromptView) {

	var BaseView = Backbone.View.extend({

		id: 'base',

		template: _.template(BaseTemplate),

		initialize: function () {

			_.bindAll(this, 'windowResize',
							'onLoginSuccessHandler');
			
			/**
			 * notification: growl type notifcations
			 * prompt: stylish YES | NO alert box
			 * loading: loading screen
			 *
			 * If you do not want to use any of the following plugin
			 * -- comment relevant line(s)
			 * -- remove realted file(s) from the require list above
			 * -- (optional) if you want to delete any of these related files,
			 *		please make sure that they are not included elsewhere
			 **/
			
			KAPP.notification = new NotificationView();
			KAPP.loading = new LoadingView();
			KAPP.prompt = new PromptView();
			
			// register for onLoginSuccess event
			Backbone.on('onLoginSuccess', this.onLoginSuccessHandler, this);

			this.render();
		},

		render: function () {

			var self = this;
			this.$el.html(this.template());

			$('body').on('click', function (e) {
				
				/* Handle any lost focus operations here
				 * Example: Close all the unsaved new cards when they losse focus in Trello
				 */
			});
		},

		onLoginSuccessHandler: function (user) {

			KAPP.loading.hide();

			KAPP.user.set(user.toJSON());
			KAPP.user.set({
				id: null,
				user_id: user.toJSON().id,
				accessProjectDB: true
			});

			KAPP.user.updateURLRoot();

			// Save user info in the project's user table (if not already saved)
			// TODO: Change 'setUserDetails' function in api/app/index.php to suit your needs.
			KAPP.user.save({}, {

				success: function (model, response, options) {

					KAPP.processResponse(response);
					KAPP.user = model;

					/**
					 * 'id' attribute is same as 'user_id'
					 * othewise Model.isNew() method returs true becasue of which
					 * model destroy does not work during logout
					 *
					 * FIXME: use 'idAttribute' for user Model
					 **/
					KAPP.user.set({
						id: model.get('user_id')
					});

					KAPP.router.initOnUserAuthSuccess();
				},

				error: function (model, xhr, options) {

					// HTTP request failed, show error message
					KAPP.showErrorMessage('User save to local database failed');
				}
			});
		},

		windowResize: function () {

			/**
			 * Handle window resize
			 **/
			
			// var winHeight = $(window).height();
			// var winWidth = $(window).width();
		}
	});

	return BaseView;
});