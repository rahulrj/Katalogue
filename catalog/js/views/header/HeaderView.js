/**
 * @author: Anjaneyulu Reddy BEERAVALLI <anji.reddy@knolskape.com>
 *
 * @since: 17 Jan, 2013
 * @file: HeaderView.js
 *
 * @copyright: KNOLSKAPE Solutions Pvt Ltd
 **/

 /**
 * FILE DESCRIPTION
 * Header View is the top panel off the application. You can handle all the panel related actions here.
 * NOTE: You may remove the header view if you do not need for you application.
 **/
 
define([
	'jquery',
	'underscore',
	'backbone',
	'com/knolskape/login/js/util/util',
	'text!js/templates/header/HeaderTpl.tpl'
	], function ($, _, Backbone, Util, HeaderTemplate) {

	var HeaderView = Backbone.View.extend({

		id: 'header',

		className: '',

		template: _.template(HeaderTemplate),

		initialize: function () {

			_.bindAll(this, 'logoutAction');

			this.render();
			this.header = $('#header');
		},

		render: function () {

			this.$el.html(this.template({ username: KAPP.user.toJSON().username }));
		},

		events: {
			'click #logout-button': "logoutAction"
		},

		logoutAction: function (e) {

			e.preventDefault();

			/**
			 * FIXME: Logout should not be handled here.
			 * Check the correct place for this piece of code
			 */
			KAPP.user.set({ accessProjectDB: false });
			KAPP.user.updateURLRoot();

			// TODO: Add to this DELETE HTTP request to record any logout related information
			KAPP.user.destroy({

				success: function (model, response, options) {

					Util.deleteCookie(KAPP.user.toJSON().hash);

					// session deleted, now refresh the browser
					window.location.reload();
				},

				error: function (model, xhr, options) {

					KAPP.showErrorMessage('Unable to logout! Please try again later.');
				}
			});
		}
	});

	return HeaderView;
});