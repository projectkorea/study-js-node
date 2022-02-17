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

// params 주소에 추가적으로 들어오는 매개변수
// query 폼에서 데이터를 가져올 수 있는 방법 form get으로 받아오는 것 req.query
// form은 get 쿼리 아이디?가 number로 된건 form의 name이 number여서 그런거죠?
// 두개 이상일 때는 number1=5&number=2
// get은 URL에 모든 정보를 담는데 비해, post는 hTML에 body나 /jSON으로 보낸다.

//req.body는 감싸서 사용하는 것을 권장. undeifuined가 나오기 떄문?
// 그래서 body parser를 사용
//req.body에 {}로감싸져서 나옴 json
// bodyParser에 body가 req.body를 가리키는건가요?
// 그럼 중첩되는건 못쓰나요?! ㅇㅇ true하고 qs쓰면댐
// router.get('',middleware1, middleware2) 미들웨어가 순차적으로

// 미들웨어 함수는 req,res,next라는 인자가 담긴 함수를 전달해야하니까,

// const setUser = (type) => {
//   (req, res, next) => {
//     const { userName } = req.query;
//     if (type) {
//     }
//     next();
//   };
// };
