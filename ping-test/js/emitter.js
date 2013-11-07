var Emitter = function() {
    var events = [];    

    var on = function(event, fn) {
        if(typeof events[events] !== "object") {
            events[event] = [];
        }

        events[event].push(fn);
    };

    var message = function(event, fn) {
        if(typeof events[event] !== "object") {
            return false;
        }
        
        // iterate over events
        // and call them
        for(fn in events) {
            events[fn](data);
        }
    };

    return {
        on: on,
        message: message
    }; 
    
};
