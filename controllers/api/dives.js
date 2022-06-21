const router = require('express').Router();
const { Dive } = require('../../models');

router.get('/', async (req, res) => {
    const { rows } = await Dive.getLatest();
    res.json(rows);
});

router.get('/stats', async (req, res) => {
    let rows;

    switch(req.query.data) {
        case 'most_active_month':
            ({ rows } = await Dive.getActiveMonth());
            break;
        default:
            res.status(404).end();
            return;
    }

    res.json(rows[0]);
});

router.get('/:id/bydiver/', async (req, res) => {

    const { rows } = await Dive.getByDiverId({
        id: req.params.id
    });

    res.json(rows);
});

router.post('/', async (req, res) => {
    try {
        const { rows } = await Dive.create(req.body);
        res.json(rows[0]);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;