/**
 * @author: Anjaneyulu Reddy BEERAVALLI <anji.reddy@knolskape.com>
 *
 * @since: 18 Jan, 2013
 * @file: HeaderModel.js
 *
 * @copyright: KNOLSKAPE Solutions Pvt Ltd
 **/

 /**
 * FILE DESCRIPTION
 *
 * Model for header view
 **/
 
define([
	'jquery',
	'underscore',
	'backbone'
	], function ($, _, Backbone) {

	var headerModel = Backbone.Model.extend( {
		defaults: {
		}
	});

	return headerModel;
});