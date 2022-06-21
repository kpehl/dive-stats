const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/diver', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/diver.html'));
})

module.exports = router;