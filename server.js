javascript
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to receive the TXT content and save it to the ftp directory
app.post('/save-txt', (req, res) => {
    const { fileName, content } = req.body;

    if (!fileName || !content) {
        return res.status(400).send('File name and content are required.');
    }

    const filePath = path.join(__dirname, 'ftp', fileName);

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Error writing file.');
        }

        res.send('File saved successfully.');
    });
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});