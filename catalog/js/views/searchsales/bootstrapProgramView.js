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
	'text!js/templates/searchsales/bootstrapProgramTpl.tpl',
	'js/models/searchsales/bootstrapProgramModel'
    
	], function ($, _, Backbone, bootProgramTemplate,bootstrapProgramModel) {

	var bootstrapProgramView = Backbone.View.extend({

		id: 'bootprogram_view',
        className: 'bootprogram__view',
        template: _.template(bootProgramTemplate),

    

        initialize: function () {
			_.bindAll(this, 'render');
			 //EventBus.on("saveprog",this.cleanup);
							
		},

		cleanup: function() {
			console.log("progcalled");
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

	return bootstrapProgramView;
});