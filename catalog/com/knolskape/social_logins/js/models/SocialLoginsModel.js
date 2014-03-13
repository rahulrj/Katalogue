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
	'com/knolskape/social_logins/js/init'
	], function ($, _, Backbone, Keys) {

	var SocialLoginsModel = Backbone.Model.extend({
		defaults: {
			social_logins : null,
			api_keys : Keys
		}
	});

	return SocialLoginsModel;
});
