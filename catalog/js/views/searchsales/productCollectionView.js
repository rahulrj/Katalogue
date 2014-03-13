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
	'text!js/templates/searchsales/productTemp.tpl',
	'js/views/searchsales/productView'
	], function ($, _, Backbone, productTemplate) {

	var productCollectionView = Backbone.View.extend({

		id: 'productcollection_view',
        className: 'productcollection__view',
       

		
	});

	return productCollectionView;
});