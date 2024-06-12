
//DIT/FT/1B/03
//p2235064
//Aye Chan Paing  

var app = require('./controller/app.js');

var port = 8081

var server = app.listen(port, function () {

    console.log("Web App hosted http://localhost:%s", port);

});