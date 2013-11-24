var fs = require("fs");

module.exports = function(req, res) {
    var name = req.params.name;
    var filePath = "./audio/" + name + ".mp3";
    console.log(filePath);
    var stat = fs.statSync(filePath);
    
    console.log("Streaming " + name + ".mp3");

    res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
};