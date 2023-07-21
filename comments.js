// Create a web server for comments
server.get('/comments', function(req, res) {
    res.send(comments);
    }  
);


// Path: comments.js
// Create a web server for comments
server.post('/comments', function(req, res) {
    var comment = req.body;
    comments.push(comment);
    res.send(comment);
    }