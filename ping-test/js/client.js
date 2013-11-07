(function() {

    var devices = [],
        events = [],
        canvas, ctx;
    
    var init = function() {
        canvas = document.getElementById("client");
        ctx = canvas.getContext("2d");
        populate(10);
        //step();
        setInterval(step, 50);
    };

    var populate = function(d) {
        var x, y, h, w;
        h = ctx.canvas.height;
        w = ctx.canvas.width;
        
        for(var i = 0; i < d; i++) {
            x = Math.round(Math.random() * w);
            y = Math.round(Math.random() * h);
            var letter = String.fromCharCode(65 + i);
            devices.push(new Device(x, y, letter));   
        }
    };

    var render = function() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for(var i = 0; i < devices.length; i++) {
            var d = devices[i];
            ctx.save();
            ctx.translate(d.x, d.y);
            
            if(d.hasPinged) {
                ctx.beginPath();
                ctx.arc(0, 0, d.soundDist, 0, Math.PI*2, true);
                ctx.closePath();
                ctx.stroke();
            }
                         
            ctx.beginPath();
            ctx.arc(0, 0, 3, 0, Math.PI*2, true); 
            ctx.closePath();
            ctx.fill();
            ctx.font = "16px Arial";
            ctx.fillText(d.name, -5, -10);
            ctx.restore();
        }
    };

    var update = function() {
        for(var i = 0; i < devices.length; i++) {
            if(devices[i].hasPinged) {
                console.log(devices[i].name, "has pinged");
                devices[i].soundDist += 1;
            }
        }
    };

    var ping = function(idx) {
        devices[idx].ping();
    };

    var step = function() {
        update();
        render();
    };
   
    var on = function(event, fn) {

    };
 
    window.ping = ping;
    window.addEventListener("load", init);
}).call(this);
