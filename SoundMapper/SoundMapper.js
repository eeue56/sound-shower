
var SoundMapper = function() {
    
    const config = {
        SPEED_OF_SOUND: 390 // metres/hour 
    };

    var clients = [];

    var addClient = function() {};
    var removeClient = function(idx) {};

    var localize = function() {
        var queue = clients.map(function(e, idx) {
            return idx;
        });

        clients.listen();
        
        clients.on('hear', function(e) {
            // calculate distance from e.time
            
        });
    };

};