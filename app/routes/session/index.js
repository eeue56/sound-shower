module.exports = function(settings) {
    var name = settings.name;
    var id = settings.id;
    var devices = [];

    var addDevice = function(device) {
        devices.push(device);
    };

    var removeDevice = function(id) {
        console.log("There are " + devices.length +  " devices.");
        devices = devices.filter(function(device) {
            console.log("Remove:", device.id, id);
            return device.id !== id;
        });
        console.log("Now there are " + devices.length + " devices.");
    };

    return {
        name: name.trim(),
        id: id.trim(),
        devices: devices,
        addDevice: addDevice,
        removeDevice: removeDevice
    };
};