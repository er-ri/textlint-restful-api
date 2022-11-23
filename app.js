const TextLintEngine = require('textlint').TextLintEngine;
const express = require('express');
const app = express();

app.use(express.urlencoded());      // Parse URL-encoded bodies
app.use(express.json());            //Used to parse JSON bodies

app.listen(8080, (err) => {
    if (err) console.log(err);
    console.log('Running at Port 8080...');
});

app.get('/', (req, res) => {
    res.send("redirect to '/api/textlint'")
});

app.post('/api/textlint', (req, res) => {
    const req_text = req.body.text;
    const engine = new TextLintEngine();
    engine.executeOnText(req_text).then(results => {
        res.json({
            messages: results[0].messages
        });
    });
});

app.use((req, res) => {
    res.sendStatus(404);
});