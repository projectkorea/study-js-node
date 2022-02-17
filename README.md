# Node.js를 이용한 백앤드 구축

## 1. `Express.js` 개요
- `Express.js`는 Node.js에서 제공하는 강력한 웹 프레임워크다. 

### 1) 웹 프레임워크란?
- 웹 서비스를 빠르게 구성하기 위해, `HTTP 요청, 응답`, `라우팅`, `HTML Templating` 등의 기능을 제공하는 툴이다.

#### 2) 라우팅이란?

- HTTP 요청 URL에 해당하는 알맞은 응답을 보내주는 경로를 미리 설정해주는 기능을 말한다.

### 3) `express-generator`

- 프로젝트의 기본구조를 빠르게 구축할 수 있는 방법이다.
- 프로젝트 생성 이후엔 사용되지 않기 때문에 npx를 이용하여 사용된다.

```shell
npx express-generator my-web
```

#### 디렉토리 구조

![](https://user-images.githubusercontent.com/76730867/154475690-52fa0094-d0e7-4005-9c21-454d4a54c36b.PNG)


## 2. `Express.js` 사용하기

### 1) `app` 객체
```js
var express = require('express');
var app = express()
```

- `app` 객체는 `Express.js` 의 기능을 담은 객체로, `Express.js`의 모든 동작은 `app` 객체에 정의된다.

#### `app.use()`
- middleware를 사용하기 위한 함수

#### `app.listen()`
- http 서버를 생성해주는 함수

#### `app.locals`
- app에서 사용할 공통 상수
- Express.js에선 global 변수를 선언하지 않고 이 값을 이용해서 사용한다.

### 2) 라우팅

- 라우팅은 `app` 라우팅, `Express.Router`라우팅 방법이 있다.
 
### 2-1) `app` 라우팅 

```js
app.get('/', (req,res)=>{
  res.send("GET /")
})
app.post('/', (req,res)=>{
  res.send("POST /")
})
app.put('/', (req,res)=>{
  res.send("PUT /")
})
app.delete('/', (req,res)=>{
  res.send("DELETE /")
})
app.all('/', (req,res)=>{
  res.send("ANY /")
})
```

- `app`객체에 직접 `get`, `post`, `put`, `delete` 함수를 사용하여 `HTTP method`로 라우팅 할 수 있다.
- `all`함수를 사용하면 HTTP method에 상관없이 라우팅 할 수 있다.
- 첫번째 인자: 라우팅을 실행할 URL
- 두번째 인자: 라우팅이 실행될 때 작동하는 함수(Request Handler)

### 2-2) `Express.Router`

- app 라우팅은 라우팅의 핵심인 `그룹화`를 지원하지 않는다.
- 이는 `Express.Router`를 통해 라우팅을 모듈화할 수 있다.

```js
const express = require("express")
const router = express.Router()

router.get('/', (req,res,next)=>{
  res.send("respond with a resource")
})

module.exports = router
```
- `router` 객체에도 `app` 객체처럼, `get`, `put`, `post`, `delete` 함수를 사용할 수 있다.
- 라우터는 일반적으로 모듈로 만들어서 사용한다.

#### 라우터는 `app`에 `use`함수로 연결하여 사용할 수 있다.

```js
// app.js
const userRouter = require('./routes/users)
app.use('/users', userRouter)
```

#### 하위 라우터는 `router`에 `use`함수로 연결하여 사용할 수 있다.
```js
// ./routes/users.js
const configRouter = require('./config')
const router = express.Router()

router.use('/config', configRouter)
module.exports = router
```

### 3) `Request Handler`

- 라우팅에 적용되는 함수를 `Request Handler`라고 부른다.
- 설정된 라우팅 경로에 해당하는 요청이 들어오면 `Request Handler` 함수가 실행된다.
- HTTP 요청을 확인하고, 응답을 보내는 역할을 한다.

```js
router.get('/user', RequsetHandler);
```

#### Request 객체

- HTTP 요청 정보를 가진 객체
- HTTP 요청의 `path parameter`, `query parameter`, `body`, `header` 등을 확인할 수 있다.

- `req.params`: `/path/:id` 에서 `:id` 를 `req.params.id` 로 접근할 수 있다.

#### path parameter 사용
- `Express.js` 라우팅은 path parameter를 제공한다.
- path parameter를 사용하면, 주소의 일부를 변수처럼 사용할 수 있다.
`/users/:id`: `/users/123`, `/users/456` 등으로 접속했을 때 라우팅 적용
`/messages/:from-:to`: `/message/123-456` 등으로 접속했을 때 라우팅 적용

- `req.queries`: `/path?page=2` 에서 `page=2`를 `req.queries.page`로 접근할 수 있다.
- `req.body`: 일반적으로 `POST` 요청의 데이터를 `req.body` 에 저장되어 들어온다.
- `req.get('')`: `HTTP Request` 의 헤더 값을 가져올 수 있다. `req.get('Authorization')` 등으로 값을 가져온다.


#### Response 객체

- HTTP 응답을 처리하는 객체
- HTTP 응답의 데이터를 전송하거나, 응답 상태 및 헤더를 설정할 수 있다.

##### Response 객체의 주요 메서드

- `res.send()`: text 형식의 HTTP 응답을 전송한다.
- `res.json()`: json 형식의 HTTP 응답을 전송한다.
- `res.render()`: HTML Template을 사용하여 화면을 전송한다.
- `res.set()`: HTTP 응답의 헤더를 설정한다.
- `res.status()`: HTTP 응답의 상태 값을 설정한다.

## 3. 중간정리
- `Express.js` 는 `app` 객체를 시작으로 모든 동작이 이루어진다.
- `app` 객체나 `Express.Router`를 사용하여 라우팅을 구현할 수 있다.
- `Request Handler`를 통해 HTTP 요청과 응답을 처리할 수 있다.



# notes

`params` 주소에 추가적으로 들어오는 매개변수
`query` 폼에서 데이터를 가져올 수 있는 방법 form get으로 받아오는 것 req.query

form은 get 쿼리 아이디?가 number로 된건 form의 name이 number여서 그런거죠?
두개 이상일 때는 number1=5&number=2
get은 URL에 모든 정보를 담는데 비해, post는 hTML에 body나 /jSON으로 보낸다.
req.body는 감싸서 사용하는 것을 권장. undeifuined가 나오기 떄문?
그래서 body parser를 사용
req.body에 {}로감싸져서 나옴 json
bodyParser에 body가 req.body를 가리키는건가요?
그럼 중첩되는건 못쓰나요?! ㅇㅇ true하고 qs쓰면댐

```js
 router.get('',middleware1, middleware2) 미들웨어가 순차적으로
 미들웨어 함수는 req,res,next라는 인자가 담긴 함수를 전달해야하니까,
 const setUser = (type) => {
 (req, res, next) => {
 const { userName } = req.query;
 if (type) {
 }
 next();
 };
 };
```
