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
	'text!js/templates/searchsales/sliderTpl.tpl'
	], function ($, _, Backbone, sliderTemplate) {

	var sliderView = Backbone.View.extend({

		id: 'slider_view',
        className: 'slider__view',
        template: _.template(sliderTemplate),

    

        initialize: function () {
			_.bindAll(this, 'render');
							
		},

        
        render: function () {

        	this.$el.html(this.template());
			return this;       
			
		},

		events: { 
                'click input[value="products"]':'callProducts',
                'click input[value="simulation"]':'callSimulations',
                'click input[value="animation"]':'callAnimations',
                'click input[value="casestudy"]':'callCaseStudies',
                'click input[value="elearning"]':'callELearnings',
                'click input[value="ilt"]':'callIlts',
                'click input[value="program"]':'callPrograms'

            },

        callPrograms : function(event ) { 
        	if(event.currentTarget.checked)
            console.log("clicked it");
        else
        	console.log("hey");
        },



		

		
	});

	return sliderView;
});