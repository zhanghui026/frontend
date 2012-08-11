define(['common', 'modules/expandable'], function(common, Expandable) {

    describe("Expandable", function() {

        it("should be able to operate multiple exapandables on a single page", function(){
            
            var a = new Expandable('trail-a');
            var b = new Expandable('trail-b');

            common.mediator.emit('modules:related:render');
            
            expect(common.$('#trail-a .count')[0].innerHTML).toBe('5');
            expect(common.$('#trail-b .count')[0].innerHTML).toBe('2');

            common.mediator.emit('modules:expandable:expandedChange:trail-a', false);
            common.mediator.emit('modules:expandable:expandedChange:trail-b', true);
        
            expect(document.getElementById('trail-a').className).toBe('shut');
            expect(document.getElementById('trail-b').className).toBe('');
        });

        it("should correctly render the default shut state", function(){
            var a = new Expandable('trail-c');
            
            common.mediator.emit('modules:related:render');
            
            expect(common.$('#trail-c')[0].className).toBe('shut');
            expect(common.$('#trail-c .cta')[0].innerHTML).toBe('more');
        });

        it("should expand and contract a panel", function(){
            var x = new Expandable('trail-d')

            common.mediator.emit('modules:related:render');
    
            // shut
    
            common.mediator.emit('modules:expandable:expandedChange:trail-d', false);
            expect(document.getElementById('trail-d').className).toBe('shut');
           
            // open 
            common.mediator.emit('modules:expandable:expandedChange:trail-d', true);
            expect(document.getElementById('trail-d').className).toBe('');
        
        });
        
        it("should visually represent the number of items in the panel", function(){
            var x = new Expandable('trail-e');
            common.mediator.emit('modules:related:render');
            expect(common.$('#trail-e .count')[0].innerHTML).toBe('3');
        });
       
    });

});
