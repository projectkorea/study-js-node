const express = require('express');
const router = require('./routes/notes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((req, res, next) => {
  // 정의되지 않은 주소로 갈 경우
  res.status(404);
  res.send({
    result: 'fail',
    error: `Page not found ${req.path}`,
  });
});

app.use((err, req, res, next) => {
  // 전 주소 오류 핸들링 미들웨어
  res.status(500);
  setTimeout(() => {
    console.log(err.message);
    res.redirect('/');
  }, 2000);
});

app.listen('3000', () => console.log(`HTTP://localhost:3000, SERVER ON`));
