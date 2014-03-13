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
	'text!js/templates/searchsales/productTemp.tpl'
	], function ($, _, Backbone, productTemplate) {

	var productView = Backbone.View.extend({

		id: 'product_view',
        className: 'product__view',
        template: _.template(productTemplate),

    

        initialize: function () {
			_.bindAll(this, 'render');
							
		},

        
        render: function () {

        	var attributes=this.model.toJSON();
        	this.$el.html(this.template(attributes));
        	return this;        
			
		}

		

		
	});

	return productView;
});