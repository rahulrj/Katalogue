
define([
	'jquery',
	'underscore',
	'backbone',
	'js/models/searchsales/productModel'
	], function ($, _, Backbone,productModel) {

	var prodCollection = Backbone.Collection.extend( {

		url : 'api/ext/laravel/rahul_php/public/index.php/searchOnSkills?skill_name=abc',
		model:productModel,

		 parse: function(response) {
               return response;
         }
		
	});

	return prodCollection;
});