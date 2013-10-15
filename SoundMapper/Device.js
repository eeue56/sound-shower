var Device = function() {
    
    var mac = null;
    var distTo = {};
    var beep = function() {};
    var events = {
        //test: [fn, fn, fn]
    };

    /**
     * Look for registered events 
     * with this name and call them,
     * passing data as an argument
     * @param  {[type]} event [description]
     * @param  {[type]} data  [description]
     * @return {[type]}       [description]
     */
    var fire = function(event, data) {
        var registered = events[event];
        if(typeof registered === "undefined") {
            throw {
                name: "NoHandlerException",
                message: "There are no handlers registered to this event."
            }
        } else {
            for(var i = 0; i < events.length; i++) {
                var handler = events[i];
                handler(data);
            }
        }
    };

    /**
     * Register an event
     * @param  {string}   event [Event name]
     * @param  {Function} fn    [Callback]
     */
    var on = function(event, fn) {
        if(typeof events[event] === "undefined") {
            events[event] = [];
        };

        events[event].push(fn);
    };

};