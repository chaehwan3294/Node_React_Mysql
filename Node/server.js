//웹 서버 express 프레임워크
const express = require('express');
const app = express();

//포트설정
const PORT = process.env.port || 5000;

//DB 
const mysql = require('mysql');

//DB 접속 설정
const db = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: '1234',
    database: 'noticedb'
})

//CORS 정책
const cors = require('cors');

//CORS 설정
const corsOptions = {
    origin: 'http://localhost:3000',
    Credentials: true
}

//CORS 미들웨어
app.use(cors(corsOptions));

//JSON 파싱 미들웨어 적용
app.use(express.json());

//url-encoded 파실 미들웨어 
app.use(express.urlencoded({extended:true}));

//설정한 포트로 접속
app.listen(PORT, ()=>{
    console.log('listening on 5000')
})

app.get('/', (require, respond)=>{
    respond.sendFile(__dirname+'/index.html')
})

app.post('/data', (req, res)=>{
    console.log(req.body);
    res.send("전송완료");
})

//게시글 수
app.get('/posts/total', (req, res)=>{
    db.query('select count(*) cnt from posts;',(err,result)=>{
        res.send(result)
    })
})

//게시글 목록
app.get('/posts',(req, res)=>{
    console.log(req.query.page);
    const page = req.query.page;
    const start = (page -1) *10;

    const sql = `select * from posts order by id desc limit ${start}, 10`

    db.query(sql, (err, result)=>{
        res.send(result)
    })
})

//게시글 읽기
app.get('/posts/read/:id', (req, res)=>{
    console.log(req.params)
    const id = req.params.id;

    db.query(`select * from posts where id=${id}`, (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result[0])
        }
        
    })
})

//게시글 쓰기
app.post('/posts/insert',(req, res)=>{
    const title = req.body.title;
    const body = req. body.body;
    const writer = req.body.writer;

    const sql = `insert into posts(title, body, writer) values('${title}', '${body}', '${writer}');`
    db.query(sql, (err, result)=>{
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }else {
            res.send(result);
        }
    })
})


//게시글 수정
app.post('/posts/update',(req,res)=>{
    const id = req.body.id;
    const title = req.body.title;
    const body = req.body.body;

    const sql = `update posts set title ='${title}', body='${body}' where id='${id}'`

    db.query(sql, (err, result)=>{
        if(err){
            console.log(err)
            res.status(500).send('Internal Server Error');
        }else{
            res.sendStatus(200);
        }
    })
})


//게시글 삭제
app.post('/posts/delete/:id',(req, res)=>{
    const id = req.params.id;

    const sql = `delete from posts where id='${id}'`;
    db.query(sql, (err, result)=>{
        res.sendStatus(200)
    })
})
