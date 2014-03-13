({
	appDir: '.',
	baseUrl: '.',
	dir: '../user',
	paths: {
		'jquery'					: 'com/ext/jquery/jquery-1.10.1.min',
		'underscore'				: 'com/ext/underscore/underscore-min',
		'backbone'					: 'com/ext/backbone/backbone-min',
		'bootstrap'					: 'com/ext/bootstrap/js/bootstrap.min',
		'text'						: 'com/ext/require/text',
		'jquery.qtip'				: 'com/ext/jquery/qtip/jquery.qtip.min'
		// 'jqueryui'					: 'com/ext/jquery/jqueryui/jquery-ui.min'
	},
	modules: [
		{
			name: 'main'
		}
	],
	preserveLicenseComments: false,
	optimizeAllPluginResources: true,
	findNestedDependencies: true,
	removeCombined: true
	/*
	cssIn: "assets/css/main.css",
    out: "./assets/css/main-min.css"
	*/
});