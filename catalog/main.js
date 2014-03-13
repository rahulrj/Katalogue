/**
 * @author: Anjaneyulu Reddy BEERAVALLI <anji.reddy@knolskape.com>
 *
 * @since: 11 Jan, 2013
 * @file: main.js
 *
 * @copyright: KNOLSKAPE Solutions Pvt Ltd
 **/

 /**
 * FILE DESCRIPTION
 *
 * Main.js is the first point of contact after require.js is downloaded
 * There are many plugins included in this file. Please find their description below
 *
 * (TODO: update this section if you use any other plugins)
 *
 * jquery					: cross browser javascript library to simplify client-side scripting
 * underscore				: utility functions library
 * backbone					: MV* framework for javascript
 * foundation				: KNOLSKAPE's custom plugin which includes event bus in backbone.js
 * bootstrap				: CSS framework
 * text						: A RequireJS/AMD loader plugin for loading text resources
 * jquery.qtip				: qTip is a tooltip plugin for the jQuery framework. It's cross-browser and customizable.
 * jquery.fileupload		: Fileupload plugin
 *
 *
 * How to remove a plugin?
 *	--  remove an unwanted plugin by commenting corresponding row (in 'paths' or 'shim' (if any) in require.config)
 *
 **/

require.config({

	'paths'		: {
		'jquery'					: 'com/ext/jquery/jquery-1.10.1.min',
		'underscore'				: 'com/ext/underscore/underscore-min',
		'backbone'					: 'com/ext/backbone/backbone-min',
		'bootstrap'					: 'com/ext/bootstrap/js/bootstrap.min',
		'text'						: 'com/ext/require/text',
		'jquery.qtip'				: 'com/ext/jquery/qtip/jquery.qtip.min',
		'jqueryui'					: 'com/ext/jquery/jqueryui/jquery-ui.min',
		'jqueryui.touchpunch'		: 'com/ext/jquery/jqueryui/jquery.ui.touch-punch.min',
		'bootstrap.select'			: 'com/ext/bootstrap/js/bootstrap-select',
		'bootstrap.switch'			: 'com/ext/bootstrap/js/bootstrap-switch',
		'flatui.checkbox'			: 'com/ext/flat-ui/js/flatui-checkbox',
		'flatui.radio'				: 'com/ext/flat-ui/js/flatui-radio',
		'jquery.tagsinput'			: 'com/ext/jquery/jquery.tagsinput',
		'jquery.placeholder'		: 'com/ext/jquery/jquery.placeholder',
		'jquery.stacktable'			: 'com/ext/jquery/jquery.stacktable',
		'bootstrap.check'           : 'com/ext/style/checkbox/js/bootstrap-checkbox'
	},

	'shim': {

		'underscore': {
			exports: '_'
		},

		'backbone'			: {
			deps			: ['jquery', 'underscore'],
			exports			: 'Backbone'
		},

		'bootstrap'			: {
			deps			: ['jquery'],
			exports			: 'bootstrap'
		},

		'jqueryui'			: {
			deps			: ['jquery'],
			exports			: 'jqueryui'
		},

		'jqueryui.touchpunch'			: {
			deps			: ['jquery'],
			exports			: 'jqueryui.touchpunch'
		},

		'bootstrap.select'	: {
			deps			: ['jquery', 'bootstrap'],
			exports			: 'bootstrap.select'
		},

		'bootstrap.switch'			: {
			deps			: ['jquery', 'bootstrap'],
			exports			: 'bootstrap.switch'
		},

		'flatui.checkbox'			: {
			deps			: ['jquery', 'jqueryui'],
			exports			: 'flatui.checkbox'
		},

		'flatui.radio'			: {
			deps			: ['jquery', 'jqueryui'],
			exports			: 'flatui.radio'
		},

		'jquery.tagsinput'	: {
			deps			: ['jquery'],
			exports			: 'jquery.tagsinput'
		},

		'jquery.placeholder'	: {
			deps			: ['jquery'],
			exports			: 'jquery.placeholder'
		},

		'jquery.stacktable'	: {
			deps			: ['jquery'],
			exports			: 'jquery.stacktable'
		}
	}
});

require([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'js/routers/myRouter'
	], function ($, _, Backbone, Bootstrap, myRouter) {

	$(document).ready(function () {

		/*
		 * Application's global object.
		 * All utility functions will be added to this object.
		 *
		 * TODO: Please try not to use any other global variable.
		 */
		window.KAPP = {

			isAppIniatilized: false,

			showErrorMessage: function (message) {
				alert(message);
			},

			processResponse: function (response) {
				if (response.success === 0) {
					KAPP.showErrorMessage('success is not 1'); // TODO: change error message
				}
			}
		};

		// start the application router
		KAPP.router = new myRouter();
		Backbone.history.start();
	});
});