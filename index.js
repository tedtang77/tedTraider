/**
 * Created by Ted on 2016/3/1.
 */


var createServer = require('./server.js');
var server = createServer();

var port = Number(process.env.PORT || 5000);
server.listen(port, function(){
    console.log("Listening on "+ port);
});

