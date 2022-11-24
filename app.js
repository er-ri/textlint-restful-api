const TextLintEngine = require('textlint').TextLintEngine;
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8081;

app.use(express.urlencoded());      // Parse URL-encoded bodies
app.use(express.json());            // Used to parse JSON bodies

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`server started on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send(`Running at ${PORT}.`)
});

app.post('/api/textlint', (req, res) => {
    const req_text = req.body.text;
    const engine = new TextLintEngine();
    engine.executeOnText(req_text).then(results => {
        res.json({
            textlint: results[0].messages
        });
    });
});

app.use((req, res) => {
    res.sendStatus(404);
});