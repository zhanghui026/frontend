define(['common', 'modules/related', 'modules/images', 'modules/popular', 'modules/expandable',
    'vendor/ios-orientationchange-fix', 'modules/relativedates', 'modules/analytics/clickstream',
    'modules/analytics/omniture', 'modules/tabs', 'modules/fonts', 'qwery', 'modules/detect',
            'modules/navigation/top-stories.js', 
                'modules/navigation/controls.js'], 
    function(common, Related, Images, Popular, Expandable, Orientation, RelativeDates,
                Clickstream, Omniture, Tabs, Fonts, qwery, detect,
                    TopStories, NavigationControls) {

      modules = {

            upgradeImages: function() {
                var i = new Images();
                i.upgrade();
            },

            transcludeNavigation: function(config) {
                new NavigationControls().initialise();
                new TopStories().load(config);
            },

            transcludeRelated: function(host, pageId) {
                 var url =  host + '/related/UK/' + pageId,
                     hasStoryPackage = !document.getElementById('js-related'),
                     relatedExpandable = new Expandable({ id: 'related-trails', expanded: false });
               
                if (hasStoryPackage) {
                    relatedExpandable.initalise();
                }
                
                if (!hasStoryPackage) { 
                    common.mediator.on('modules:related:render', relatedExpandable.initalise);
                    new Related(document.getElementById('js-related')).load(url);
                }
            },

            transcludeMostPopular: function(host, section) {
                var url = host + '/most-popular/UK/' + section,
                    domContainer = document.getElementById('js-popular');

                new Popular(domContainer).load(url);
                
                common.mediator.on('modules:popular:render', function(){
                    common.mediator.emit('modules:tabs:render', '#js-popular-tabs');
                    qwery('.trailblock', domContainer).forEach(function(tab){
                        var popularExpandable = new Expandable({ id: tab.id, expanded: false });
                        common.mediator.on('modules:popular:render', popularExpandable.initalise);
                    });
                })
            },

            loadFonts: function(config, ua, prefs) {
                if (config.switches.fontFamily && prefs.exists('font-family')) {
                    var fileFormat = detect.getFontFormatSupport(ua),
                        fontStyleNodes = document.querySelectorAll('[data-cache-name].initial');
                    new Fonts(fontStyleNodes, fileFormat).loadFromServerAndApply();
                }
            },

            showRelativeDates: function() {
                RelativeDates.init();
            },

            loadOmnitureAnalytics: function(config) {
                var cs = new Clickstream({ filter: ["a", "span"] })
                var o = new Omniture(null, config).init();
            },

            loadOphanAnalytics: function(config) {
                require(['http://s.ophan.co.uk/js/t6.min.js'], function(ophan){});
            },

            showTabs: function() {
                var tabs = new Tabs().init();
            }
         
        }

    return {
        init: function(config) {
            modules.upgradeImages();
            modules.transcludeRelated(config.page.coreNavigationUrl, config.page.pageId);
            modules.transcludeMostPopular(config.page.coreNavigationUrl, config.page.section);
            modules.showRelativeDates();
            modules.showTabs();
            modules.showTabs(); 
            modules.transcludeNavigation(config); 
            modules.loadOmnitureAnalytics(config); 
            modules.loadFonts(config, navigator.userAgent, guardian.userPrefs); 
            modules.loadOphanAnalytics(config); 
        }
    }
});
