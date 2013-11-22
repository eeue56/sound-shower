var Device = function(socket, settings) {

    var ip = settings.ip || "";
    var status = 0;

    var on = function(event, fn) {
        socket.on(event, fn);
    };

    var emit = function(event, data) {
        socket.emit(event, data);
    };

    return {
        ip: ip,
        on: on,
        emit: emit,
        status: status
    };
};