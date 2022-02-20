const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/index.html'));
});

router.get('/get/count', (req, res) => {
  const number = parseInt(req.query.number);
  res.send(`you got ${number}`);
});

// post요청을 받는 코드
router.post('/post/count', (req, res) => {
  const number = req.body.number;
  res.send(`you posted ${number}`);
});

module.exports = router;
