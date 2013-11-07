(function() {

    var devices = {},
        events = new Emitter(),
        canvas, ctx;
   
    // map functions to emitter
    var on = events.on;
    var message = events.message;
   
    var init = function() {
        canvas = document.getElementById("server");
        ctx = canvas.getContext("2d");
    };
    
    // bind to window
    window.server = {
        message: message
    };

    window.addEventListener("load", init);

}).call(this);
