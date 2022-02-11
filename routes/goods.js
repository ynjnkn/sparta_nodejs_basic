const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('This is root page');
});

router.get('/goods', (req, res) => {
	res.send('This is goods page');
});

module.exports = router;