var http = require('http'),
    fs = require('fs');
var chat = require('./chat');


    http.createServer(function(req, res) {  
       
       switch(req.url){
            case '/':
               sendFile("./index.html",res);
                break;

            case '/subscribe':
                chat.subscribe (req,res);
                break;
            case '/publish':
                var body = '';
                req.on('readable', function () {
                    body +=req.read();
                });
                req.on('end', function () {
                    body =JSON.parse(body);
                    chat.publish(body.message);
                    res.end("ok");
                });

                break;
            default:
                res.statusCode = 404;
                res.end("Not found");

        } 
    }).listen(8080, 'localhost'); 


function sendFile(fileName, res) {
    var fileSend = fs.readFile(fileName, function (err, html) {
        if (err) {
            throw err;
        }
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();
    });
}

