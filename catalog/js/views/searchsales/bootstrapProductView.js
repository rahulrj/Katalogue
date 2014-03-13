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
 	'text!js/templates/searchsales/bootstrapProductTpl.tpl'
 	], function ($, _, Backbone, bootProductTemplate) {

 		var bootstrapProductView = Backbone.View.extend({

 			id: 'bootproduct_view',
 			className: 'bootproduct__view',
 			template: _.template(bootProductTemplate),

 			

 			initialize: function () {
 				_.bindAll(this, 'render');
 				EventBus.on("saveprod",this.cleanup);
 				
 			},

 			cleanup: function() {
 				console.log("prodcalled");
 				this.undelegateEvents();
 				this.$el.removeData().unbind(); 
 				this.remove();
 				Backbone.View.prototype.remove.call(this);

 			},

 			
 			render: function () {

 				var attributes=this.model.toJSON();
 				this.$el.html(this.template(attributes));
 				return this;         
 				
 			}

 			

 			
 		});

 		return bootstrapProductView;
 	});