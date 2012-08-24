define(['common', 'modules/related', 'modules/images', 'modules/popular', 'modules/expandable', 'vendor/ios-orientationchange-fix', 'modules/relativedates', 'modules/fonts'],
    function(common, Related, Images, Popular, Expandable, Orientation, RelativeDates, Fonts) {

    return {
        init: function(config) {

            // upgrade images
            new Images().upgrade();

            // load most popular
            var popularUrl = config.page.coreNavigationUrl + '/most-popular/UK/' + config.page.section;
            new Popular(document.getElementById('js-popular')).load(popularUrl);
            
            // load related
            var relatedUrl = config.page.coreNavigationUrl + '/related/UK/' + config.page.pageId;
            new Related(document.getElementById('related')).load(relatedUrl);

            // load fonts
            if (config.switches.fontLoading && Guardian.UserPrefs.isTrue('fontloading')) {
                // TODO: More reliable font support detection.
                var fileFormat = Fonts.detectSupportedFormat(navigator.userAgent);
                var fontStyleNodes = document.querySelectorAll('[data-cache-name].initial');
                new Fonts(fontStyleNodes, fileFormat).loadFromServerAndApply();
            } else {
                // If fonts disabled, tidy up local cache.
                Fonts.clearFontsFromStorage();
            }

            // load related or story package
            var hasStoryPackage = !document.getElementById('js-related');
            
            var relatedExpandable = new Expandable({ id: 'related-trails', expanded: false });

            if (hasStoryPackage) {
                relatedExpandable.initalise();
            } else { 
                common.mediator.on('modules:related:render', relatedExpandable.initalise);
                var relatedUrl = config.page.coreNavigationUrl + '/related/UK/' + config.page.pageId;
                new Related(document.getElementById('js-related')).load(relatedUrl);
            }

            // show relative dates
            RelativeDates.init();

        }
    }
});
