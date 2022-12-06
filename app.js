const TextLintEngine = require('textlint').TextLintEngine;
const express = require('express');
const app = express();

// User-defined converter table.
const converter = require("./converter");

const PORT = process.env.PORT || 8081;

app.use(express.urlencoded({ extended: true }));    // Parse URL-encoded bodies
app.use(express.json());                            // Used to parse JSON bodies
app.use(express.static(__dirname + "/public"));

var server = app.listen(PORT, (err) => {
    if (err) console.log(err);
    var host = server.address().address
    var port = server.address().port

    console.log("Web app listening at http://%s:%s", host, port)
});

app.get('/', (req, res) => {
    // res.send(`Running at ${PORT}.`)
    res.render(__dirname + "/index.html", { port: PORT });
});


app.post('/api/textlint', (req, res) => {
    const req_text = req.body.text;
    const engine = new TextLintEngine();

    // Replace forbidden characters before the textlint processing.
    var sanitized_text = converter.replaceForbiddenForm(req_text);

    engine.executeOnText(req_text).then(results => {
        res.json({
            sanitized_text: sanitized_text,   
            textlint: results[0].messages
        });
    });
});

app.use((req, res) => {
    res.sendStatus(404);
});