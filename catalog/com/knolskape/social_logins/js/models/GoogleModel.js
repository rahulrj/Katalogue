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

	var GoogleModel = Backbone.Model.extend({
		defaults: {
			apiKey: null
		}
	});

	return GoogleModel;
});
