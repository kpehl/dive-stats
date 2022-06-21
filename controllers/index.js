const router = require('express').Router();
const apiRoutes = require('./api');
const htmlRoutes = require('./html');
const path = require('path');

router.use('/api', apiRoutes);

router.use('/', htmlRoutes);

router.use((req,res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/error-404.html'));
})

module.exports = router;