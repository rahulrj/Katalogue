
 
define([
	'jquery',
	'underscore',
	'backbone'
	], function ($, _, Backbone) {

	var searchBarModel = Backbone.Model.extend( {
		defaults: {
		}
	});

	return searchBarModel;
});