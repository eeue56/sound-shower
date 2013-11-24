var __id = 0;
module.exports = function(socket, settings) {

    var id = '' + __id++;
    var status = 0;

    var on = function(event, fn) {
        socket.on(event, fn);
    };

    var emit = function(event, data) {
        socket.emit(event, data);
    };

    var endpoint = socket.manager.handshaken[socket.id].address;

    return {
        id: id,
        ip: endpoint.address,
        on: on,
        emit: emit,
        status: status
    };
};