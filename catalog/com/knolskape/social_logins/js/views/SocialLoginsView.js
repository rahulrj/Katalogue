/**
 *
 * @author Dhiraj Bodicherla <dhiraj.bodicherla@knolskape.com>
 *
 * @version $Id$
 * @copyright KNOLSKAPE Solutions PVT LTD
 * @since 18 July, 2012
 * @package default
 **/

/**
 * File description
 **/

define([
	'jquery',
	'underscore',
	'backbone',
	'text!com/knolskape/social_logins/js/templates/SocialLoginTpl.tpl',
	'com/knolskape/social_logins/js/models/FacebookModel',
	'com/knolskape/social_logins/js/views/FacebookView',
	'com/knolskape/social_logins/js/models/TwitterModel',
	'com/knolskape/social_logins/js/views/TwitterView',
	'com/knolskape/social_logins/js/models/LinkedinModel',
	'com/knolskape/social_logins/js/views/LinkedinView',
	'com/knolskape/social_logins/js/models/OpenIDModel',
	'com/knolskape/social_logins/js/views/OpenIDView',
	'com/knolskape/social_logins/js/models/GoogleModel',
	'com/knolskape/social_logins/js/views/GoogleView'
	], function ($, _, Backbone, SocialLoginTemplate, FacebookModel, FacebookView,
				TwitterModel, TwitterView, LinkedinModel, LinkedinView, OpenIDModel,
				OpenIDView, GoogleModel, GoogleView ) {
					
	var SocialLoginsView = Backbone.View.extend( {

		template: _.template(SocialLoginTemplate),

		initialize: function () {
			this.render();
		},

		render: function() {

			this.$el.html(this.template());

			var modelAttrs = this.model.toJSON();
			var logins = modelAttrs.social_logins;
			var socialView;

			for (var i = 0; i < logins.length; i++) {
				
				switch( logins[i] ) {

					case 'facebook':

						socialView = new FacebookView({
							model: new FacebookModel({
								api_key: modelAttrs.api_keys.facebook_api_key
							})
						});

						break;

					case 'twitter':

						socialView = new TwitterView({
							model: new TwitterModel({
								api_key: modelAttrs.api_keys.twitter_api_key
							})
						});

						break;

					case 'linkedin':

						socialView = new LinkedinView({
							model: new LinkedinModel({
								api_key: modelAttrs.api_keys.linkedin_api_key
							})
						});

						break;

					case 'google' :

						socialView = new GoogleView({
							model: new GoogleModel()
						});

						break;

					case 'openid' :

						socialView = new OpenIDView({
							model: new OpenIDModel()
						});
				}
				
				this.$('.btn_container').append( socialView.el );
			}
		}
	});

	return SocialLoginsView;
});