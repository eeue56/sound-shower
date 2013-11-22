module.exports = function(settings) {
    var name = settings.name;
    var id = settings.id;
    var devices = [];

    var addDevice = function(device) {
        devices.push(device);
    };

    var removeDevice = function(idx) {
        devices.splice(idx, 1);
    };

    return {
        name: name.trim(),
        id: id.trim(),
        devices: devices,
        addDevice: addDevice,
        removeDevice: removeDevice
    };
};