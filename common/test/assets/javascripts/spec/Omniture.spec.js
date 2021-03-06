define(['analytics/omniture', 'common'], function(Omniture, common) {
    
    describe("Omniture", function() { 

        var config = {};

        beforeEach(function(){
            
            config.page = { omnitureAccount: 'the_account' }

            s = { t: function(){}, tl: function(){} };
            sinon.spy(s, "t");
            sinon.spy(s, "tl");

            window.performance = { timing: { requestStart: 1, responseStart: 5000 } };
            window.innerWidth = 500;
           
        });

        it("should correctly set the Omniture account", function(){
            var o = new Omniture(s, config).init();
            expect(s_account).toBe("the_account");
        });

        it("should record clicks with correct analytics name", function(){

            config.page.contentType = 'Article';
            s.pageType = 'article';

            var o = new Omniture(s, config)
            o.init();
            o.populateEventProperties('outer | link');

            expect(s.linkTrackVars).toBe('eVar37,events');
            expect(s.linkTrackEvents).toBe('event37');
            expect(s.events).toBe('event37');
            expect(s.eVar37).toBe("Article | outer | link");

        });

        it("should correctly set page properties", function(){
        
            s.linkInternalFilters = 'guardian.co.uk,guardiannews.co.uk'
            config.page = {
                    omnitureAccount: 'the_account',
                    webTitle: 'a really long title a really long title a really long title a really long title a really long title a really long title ',
                    contentType: 'Article',
                    pageCode: '12345',
                    section: 'theworld',
                    keywords: 'Syria,Yemen,Egypt,Bahrain',
                    author: 'Brian Whitaker,Haroon Siddique',
                    tones: 'Minute by minutes,News,Blogposts',
                    series: 'The Fiver',
                    blogs: "Middle East Live",
                    buildNumber: "build-73",
                    edition: "US",
                    webPublicationDate: "2012-02-22T16:58:00.000Z"
            };

            var o = new Omniture(s, config)
            o.populatePageProperties();

            expect(s.linkInternalFilters).toBe("guardian.co.uk,guardiannews.co.uk,localhost,gucode.co.uk,gucode.com,guardiannews.com");
            expect(s.pageName).toBe("a really long title a really long title a really long title a really lon:Article:12345");
            expect(s.pageType).toBe("Article");
            expect(s.prop9).toBe("Article");
            expect(s.channel).toBe("theworld");
            expect(s.prop11).toBe("theworld");
            expect(s.prop4).toBe("Syria,Yemen,Egypt,Bahrain");
            expect(s.prop6).toBe("Brian Whitaker,Haroon Siddique");
            expect(s.prop8).toBe("12345");
            expect(s.prop10).toBe("Minute by minutes,News,Blogposts");
            expect(s.prop13).toBe("The Fiver");
            expect(s.prop25).toBe("Middle East Live");
            expect(s.prop14).toBe("build-73");
            expect(s.prop47).toBe("US");
            expect(s.prop48).toBe("low");
            expect(s.prop56).toBe("median");
            expect(s.prop30).toBe("content");
            expect(s.prop19).toBe("frontend");
            expect(s.eVar19).toBe("frontend");
        });

        it("should log a page view event", function() {
            var o = new Omniture(s, config).init();
            waits(100); 
            runs(function() {
                expect(s.t).toHaveBeenCalledOnce();
            });
        });
        
        it("should log a clickstream event", function() {

            var o = new Omniture(s, config)
            o.init();
            waits(100);
            runs(function() {
                common.mediator.emit('module:clickstream:click', ['tag', false, false]);
                expect(s.tl).toHaveBeenCalledOnce();
            });
        });

        it("should not introduce an artificial delay in to internal anchor or XmlHttpRequest links", function(){
            
            var o = new Omniture(s, config)
            o.init();
            waits(100);
            runs(function() {
                common.mediator.emit('module:clickstream:click', ['tag', false, true]); // xhr
                common.mediator.emit('module:clickstream:click', ['tag', true, false]); // internal anchor
                common.mediator.emit('module:clickstream:click', ['tag', true, true]);  // xhr + internal anchor
                common.mediator.emit('module:clickstream:click', ['tag', false, false]); // neither 
                expect(s.tl.withArgs(false, 'o', 'tag')).toHaveBeenCalledThrice();
            });

        });

    });


});

