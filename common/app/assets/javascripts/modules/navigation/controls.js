define(['common', 'vendor/bean-0.4.11-1', 'bonzo'], function(common, Bean, bonzo) { 

    var Tab = function(label) {
        var label = document.createElement('div'),
            state = true;
    }

    var Navigation = function(opts) {

        var toggles = [new Tab('Sections'), new Tab('Top Stories')];
       
        // View
        
        var view = {

            toggle: function(state, position, elm) {

                var item = bonzo(document.getElementById(((state == "sections") ? "sections-" + position : "topstories-" + position)));
                var altItem = bonzo(document.getElementById(((state == "sections") ?  "topstories-" + position : "sections-" + position)));

                if (altItem.hasClass('on')) { // the "other" panel is visible, so hide it then show current
                    altItem.toggleClass('on initially-off');
                }

                if (item.hasClass('initially-off')) {
                    item.toggleClass('on initially-off');
                } else if (item.hasClass('on')) {
                    item.toggleClass('on initially-off');
                }

                return (state)
            },

            // this menu is on by default for non-JS users, so we hide it once JS is loaded
            hideBottomMenu: function () {
                var bottomMenu = document.getElementById('sections-footer');
                bonzo(bottomMenu).addClass('initially-off');
            },

            init: function() {

                view.hideBottomMenu(); 

                // can't seem to get bean to bind on arrays of elements properly, 
                // and doing it inside loops does weird closure-related things. ugh.

                Bean.add(document.getElementById('sections-control-header'), 'click', function(e) {
                    var elm = this;
                    view.toggle('sections', 'header', elm);
                    e.preventDefault();
                });

                Bean.add(document.getElementById('sections-control-footer'), 'click', function(e) {
                    var elm = this;
                    view.toggle('sections', 'footer', elm);
                    e.preventDefault();
                });
                
                Bean.add(document.getElementById('topstories-control-header'), 'click', function(e) {
                    var elm = this;
                    view.toggle('topstories', 'header', elm);
                    e.preventDefault();
                });

                Bean.add(document.getElementById('topstories-control-footer'), 'click', function(e) {
                    var elm = this;
                    view.toggle('topstories', 'footer', elm);
                    e.preventDefault();
                });


            }
                    
        }

        // Model

        var model = {
        }
        
        this.initialise = function() {
            view.init()
        }
    }


    return Navigation 
   
});

