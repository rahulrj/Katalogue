/**
 *
 * @author Dhiraj Bodicherla <dhiraj.bodicherla@knolskape.com>
 *
 * @version $Id$
 * @copyright KNOLSKAPE Solutions PVT LTD
 * @since 27 July, 2012
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

	var UserModel = Backbone.Model.extend({

		urlRoot: 'com/knolskape/login/api/check',

		defaults: {
			user_id			: null,
			username		: null,
			state			: null,
			success			: null,
			is_admin		: null,
			ipaddress		: null,
			hash			: null,
			accessProjectDB	: false
		},

		updateURLRoot: function () {
			
			if (this.get('accessProjectDB')) {
				this.urlRoot = 'api/app/user';
			} else {
				this.urlRoot = 'com/knolskape/login/api/check';
			}
		}
	});

	return UserModel;
});