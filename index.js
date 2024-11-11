const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

// Enable CORS for all origins (you can customize it later)
app.use(cors());
app.use(bodyParser.json());

// Bullet test start endpoint
app.post('/bullet-test-start', (req, res) => {
    console.log('>> Test başladı');
    
    const { dateTime, teuStokNo, testId, operatorNo, yapilacakTestler } = req.body;

    // Validate required fields
    if (!dateTime || !testId) {
        return res.status(400).json({ detail: 'dateTime and testId are required.' });
    }

    // Randomly select genelTestSonucu as 0, 1, or 2 with 75% chance of being 1
    let genelTestSonucu;
    const randomValue = Math.random();

    if (randomValue < 0.75) {
        genelTestSonucu = 1; // 75% chance to be 1
    } else {
        genelTestSonucu = Math.floor(Math.random() * 2) * 2; // 25% chance to be 0 or 2
    }

    // Simulate test duration
    setTimeout(() => {
        console.log('>> Test bitti');
        res.json({
            status: 'success',
            dateTime: dateTime,
            teuStokNo: teuStokNo,
            testSonuclari: "['Kaldi', 'Kaldi', 'Kaldi', 'Kaldi']",
            genelTestSonucu: genelTestSonucu.toString(),
            hataMesajı: "-"
        });
    }, 5000); // Simulates a delay of 5 seconds
});

// Bullet software health check endpoint
app.post('/bullet-software-health-check', (req, res) => {
    console.log('>> Healthcheck başladı');

    const { dateTime } = req.body;

    // Validate required field
    if (!dateTime) {
        return res.status(400).json({ detail: 'dateTime is required.' });
    }

    console.log('>> Healthcheck bitti');
    res.json({
        status: 'success',
        dateTime: dateTime,
        sistemDurum: "1",
        testYuzdesi: "0",
        yapilanTest: "Güç testi"
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
