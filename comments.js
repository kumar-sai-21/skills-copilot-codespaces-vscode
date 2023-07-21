// Create web server application for comments

// Import modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Set up web server
app.set('port', process.env.PORT || 3000);

// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/getComments', function(req, res) {
    // Read comments.json
    fs.readFile('comments.json', 'utf-8', function(err, data) {
        if (err) {
            throw err;
        }

        // Send comments as JSON
        res.json(JSON.parse(data));
    });
});

app.post('/addComment', function(req, res) {
    // Read comments.json
    fs.readFile('comments.json', 'utf-8', function(err, data) {
        if (err) {
            throw err;
        }

        // Parse comments.json
        const comments = JSON.parse(data);

        // Add comment to comments.json
        comments.push(req.body.comment);

        // Write comments to comments.json
        fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
            if (err) {
                throw err;
            }

            // Send comments as JSON
            res.json(comments);
        });
    });
});

// Start web server
app.listen(app.get('port'), function() {
    console.log('Web server started on port ' + app.get('port'));
});