// 라이브러리
// 서버 => 생성
const express = require('express');
const app = express();
// crossorigin
const cors = require('cors');
app.use(cors());
// 세부 설정
app.use(cors({
    origin: "*",
    method: ["GET","POST","DELETE","PUT"]
}))

// 서버 구동
const server=app.listen(3355,()=>{
    console.log("Server started on http://localhost:3355")
});

const oracledb=require('oracledb'); // js
// import oralcedb from 'oracledb' // ts
oracledb.outFormat=oracledb.OUT_FORMAT_OBJECT
// 요청 받기
app.get('/recipe/find', (req,res)=>{
    recipeFind(req,res);
})
// 요청 처리 => req , 응답 : res
// http://localhost:3355/recipe/find?fd=맛집
async function recipeFind(req,res){
    // 검색어 받기
    // String fd=request.getParameter("fd")
    let fd=req.query.fd||'간식'; // string
    let page=req.query.page||1;
    let rowSize=12;
    let start=(rowSize*parseInt(page))-(rowSize-1);
    let end=parseInt(page)*rowSize;
    // 오라클 연결
    let connection;
    try
    {
        // getConnecton() => 서버연결
        connection=await oracledb.getConnection({
            user:"hr",
            password:"happy",
            connectionString:"localhost:1521/xe",
        });
        /*
          `SELECT no,poster,title,chef,hit,likecount,num
             FROM (SELECT no,poster,title,chef,hit,likecount,rownum as num
             FROM (SELECT no,poster,title,chef,hit,likecount
                FROM recipe
                WHERE title LIKE :title ORDER BY no ASC))
             WHERE num BETWEEN :start AND :end`
         */
        // SQL문장 전송 => 결과값 받기 => COLUMN명 (키) => 대문자
        /*const binds = {
            title:  `%${fd}%` ,
            start: start,
            end: end
        };*/

        const result = await connection.execute(
            `SELECT no,poster,title,chef,hit,likecount,num
             FROM (SELECT no,poster,title,chef,hit,likecount,rownum as num
                 FROM (SELECT no,poster,title,chef,hit,likecount
                 FROM recipe
                 WHERE title LIKE '%${fd}%' ORDER BY no ASC))
             WHERE num BETWEEN ${start} AND ${end}`
        );
        console.log(result);
        const result2=await connection.execute(
            `SELECT CEIL(COUNT(*)/12.0) as totalpage FROM recipe
             WHERE title LIKE '%${fd}%'
            `
        )
        console.log(result2);
        const data={
            totalpage:result2.rows[0].TOTALPAGE,
            recipes:result.rows
        }
        res.json(data)
    }catch(err){
        console.log(err);
    }
    finally{
        try {
            if(connection){
                await connection.close();
            }
        }catch(err){}
    }
};
var client_id = 'mfhG_lRT1i6R47_tSqdC';
var client_secret = 'vTJrB3kMPM';
app.get('/news/list', function (req, res) {
    var api_url = 'https://openapi.naver.com/v1/search/news.json?display=100&query=' + encodeURI(req.query.query); // JSON 결과
//   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // XML 결과
    var request = require('request');
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});