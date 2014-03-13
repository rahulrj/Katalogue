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
  	'js/views/searchsales/searchBarView',
	'js/models/searchsales/searchBarModel',
	'js/models/searchsales/productModel',
  	'js/views/searchsales/productView',
  	'js/views/searchsales/bootstrapSearchView',
  	'js/models/searchsales/bootstrapSearchModel',
  	'bootstrap.check',
  	'js/models/searchsales/bootstrapProductModel',
  	'js/views/searchsales/bootstrapProductView'



     ], function ($, _, Backbone, searchBarView, searchBarModel,productModel,productView,bootstrapSearchView,bootstrapSearchModel,bc,bootstrapProductModel,bootstrapProductView){
	

	var myRouter = Backbone.Router.extend({

		routes: {

			'index'		: 'showIndexScreen'

		},


        
		showIndexScreen:function(){

        	// var searchModel=new searchBarModel({});
        	// this.searchView=new searchBarView({model:searchModel});
        	// $('body').html(this.searchView.render().el);

          var searchModel=new bootstrapSearchModel({});
          this.searchView=new bootstrapSearchView({model:searchModel});
          $('body').html(this.searchView.render().el);
          $('input[type="checkbox"]').checkbox();


          // var prodModel=new bootstrapProductModel({});
          // this.prodView=new bootstrapProductView({model:prodModel});
          //  $('body').append(this.prodView.render().el);


          // $('input[type="checkbox"]').checkbox();

          
          


        	

        }
		
	

		
	});
	
	return myRouter;
});