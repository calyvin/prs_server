var express = require('express');//include the express library
var fs = require('fs');//include the fs file reading/writing library
var app = express(); //create an express app

var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public')); //set the public folder

app.set('view engine', 'ejs');

var httplogging=true;

app.get('/', function(req, res){
    if(httplogging) console.log("GET request for /index");
    var index = fs.readFileSync("views/index.html", 'utf8');
    if(httplogging) console.log("200 response - GET request for /index");
    res.send(index);
}); // respond to requests for the default route

app.get('/about', function(req, res){
    if(httplogging) console.log("GET request for /about");
    var about = fs.readFileSync("views/about.html", 'utf8');
    if(httplogging) console.log("200 response - GET request for /about");
    res.send(about);
}); // respond to requests for the /about route

app.get('/play', function(req, res){
    if(httplogging) console.log("GET request for /play");
    var opponents = ["bones", "boss", "hairy", "magic", "mickey", "modern", "pixel"];
    var g = {
        p_name: (req.query.name_input== "") ? "Someone": req.query.name_input, 
        p_character: req.query.character,
        opponent: opponents[Math.floor(Math.random() * opponents.length)]
    };

    if(httplogging) console.log("200 response - GET request for /play");
    res.render('play', {game: g});
}); // respond to requests for the /play route

app.listen(port, function() {
    console.log("Server started locally and listening on port 8000...")
});