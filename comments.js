// Create web server
// Create a web server that listens on port 3000 and serves the following routes:
// GET /comments - returns a list of all comments
// POST /comments - creates a new comment
// GET /comments/:id - returns a specific comment
// PUT /comments/:id - updates a specific comment
// DELETE /comments/:id - deletes a specific comment
// The POST and PUT routes will expect a JSON request body with the keys "author" and "text".
// The GET and POST routes will return JSON responses with the following keys:
// "id" - a unique identifier for the comment (use the lowdash library to generate a unique id)
// "author" - the author of the comment
// "text" - the text of the comment
// The GET /comments route will return an array of comment objects.
// The POST /comments route will return the newly created comment object.
// The GET /comments/:id route will return a single comment object.
// The PUT /comments/:id route will return the updated comment object.
// The DELETE /comments/:id route will return an empty object.
// If a comment with the specified id does not exist, the server should return a 404 status code.
// If a request does not contain the required author and text fields, the server should return a 400 status code.
// If a request contains additional fields, the server should return a 400 status code.
// If a request contains a non-JSON body, the server should return a 400 status code.
// If any other error occurs, the server should return a 500 status code.
// Use the express and lowdash libraries to implement the server.

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const app = express();
app.use(bodyParser.json());

let comments = [];

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.post('/comments', (req, res) => {
    if (!req.body.author || !req.body.text) {
        res.status(400).send();
        return;
    }
    if (_.keys(req.body).length > 2) {
        res.status(400).send();
        return;
    }
    const comment = {
        id: _.uniqueId(),