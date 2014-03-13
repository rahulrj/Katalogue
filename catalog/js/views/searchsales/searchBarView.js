/**
 *
 * @author Dhiraj Bodicherla <dhiraj.bodicherla@knolskape.com>
 *
 * @version $Id$
 * @copyright KNOLSKAPE Solutions PVT LTD
 * @since 28 July, 2012
 * @package default
 **/

/**
 * File description
 **/


define([
	'jquery',
	'underscore',
	'backbone',
	'text!js/templates/searchsales/searchbar.tpl',
	'js/collections/searchsales/prodCollection',
	'js/models/searchsales/productModel',
	'js/views/searchsales/productView',
	'js/views/searchsales/sliderView',
	'js/models/searchsales/sliderModel'

	], function ($, _, Backbone, SearchTemplate,prodCollection,productModel,productView,sliderView,sliderModel) {

	var searchbarView = Backbone.View.extend({

		id: 'search_bar',
        className: 'search_query',
        template: _.template(SearchTemplate),

		initialize: function () {

			_.bindAll(this, 'render');
							
		},

		render: function () {

			this.$el.html(this.template());
			return this;
			// $('body').append(this.$el);
			// this.$el.show();
		},

		events:{

			"click .submitButton":"fetch",
			"keypress #searchText" : "fetch"
		},

		fetch:function(e){

            if(e.which==13){

            var prodCollect=new prodCollection();
            var url=$("#searchText").val();
            var toFetchUrl='api/ext/laravel/rahul_php/public/index.php/searchOnSkills?skill_name='+url;
            prodCollect.url=toFetchUrl;

            prodCollect.fetch({
                    success: function(collection){
                    console.log(prodCollect.models.length); 
                    var a =prodCollect.models[1];
                    console.log(a);

                   
                   
                  
                   var noOfObjects=Object.keys(a.attributes).length;
                   
                   for(var i=0;i<noOfObjects;i++){

                   	var prodModel=new productModel();
                    prodModel.set({price:a.attributes[i].price});
                    prodModel.set({acct_manager:a.attributes[i].acct_manager});
                    prodModel.set({product_name:a.attributes[i].product_name});

                    var rolesArray=a.attributes[i].roles.split(",");
                    var rolesArrayJoin=rolesArray.join("<br>");

                    var skillsArray=a.attributes[i].skills.split(",");
                    var skillsArrayJoin=skillsArray.join("<br>");

                    var clientsArray=a.attributes[i].clients.split(",");
                    var clientsArrayJoin=clientsArray.join("<br>");


                    prodModel.set({roles:rolesArrayJoin});
                    prodModel.set({skills:skillsArrayJoin});
                    prodModel.set({clients:clientsArrayJoin});
                   

                    var view=new productView({model:prodModel});
                     $('body').append(view.render().el);


                   }
                    

                     

                    
                    

                     }
                });


                 this.renderSlide();
                 


           }


		},


		renderSlide:function(){

			     var slideModel=new sliderModel({});
        	     var slideView=new sliderView({model:slideModel});
        	     $('body').append(slideView.render().el);

        	     $(document).ready(function(){
                    $('#slide').hover(function () {
                        $(this).stop().animate({left:"0px"},500);     
                 },function () {
                    var width = $(this).width() -50;
                        $(this).stop().animate({left: - width  },500);     
                 });
                });

        	   $('input[value="products"]').prop('checked', true);


		}

		
	});

	return searchbarView;
});