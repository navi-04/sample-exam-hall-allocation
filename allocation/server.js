const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const twilio = require('twilio');

const app = express();
const PORT = 5000;

const DIRECTORY_PATH = path.join(__dirname, 'src/assets/files'); // Adjusted path to match your directory structure

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

app.use(cors());
app.use(bodyParser.json());

app.get('/api/download/:folderName', (req, res) => {
  const folderName = req.params.folderName;
  const folderPath = path.join(DIRECTORY_PATH, folderName);

  console.log(`Requested folder: ${folderName}`);
  console.log(`Resolved path: ${folderPath}`);

  if (!fs.existsSync(folderPath)) {
    console.log('Folder not found:', folderPath);
    return res.status(404).json({ error: 'Folder not found' });
  }

  res.setHeader('Content-Disposition', `attachment; filename=${folderName}.zip`);
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.on('error', err => res.status(500).send({ error: err.message }));
  archive.pipe(res);

  archive.directory(folderPath, false);
  archive.finalize();
});

app.post('/api/send-message', (req, res) => {
  const client = new twilio(accountSid, authToken);
  const { numbers, message } = req.body;

  Promise.all(
    numbers.map(number =>
      client.messages.create({
        to: number,
        from: '+18315083621', // Your Twilio number
        body: message,
      })
    )
  )
    .then(messages => res.status(200).json({ messages }))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
