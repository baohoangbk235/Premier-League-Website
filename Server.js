const express = require('express');
const app = express();
var {Pool,Client} = require("pg");
const bodyParse = require('body-parser');
const hds = require("express-handlebars");
app.engine("handlebars", hds({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    next();
});
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

app.use(express.static('./views'));

var connectionString = "postgres://postgres:23051998@localhost:5432/PremierLeage";
var pool = new Pool({
    connectionString:  connectionString,
})


app.get("/",(req,res)=>{
    res.render("ClubPage");
})

app.get("/clubs",(req,res)=>{
    res.render("ClubPage");
})

app.get("/club/:clubid/:clubname",(req,res)=>{
    var id = req.params.clubid 
    pool.query(`Select * from doibong where maclb='${id}'`,(err,data)=>{
        if(err) res.status(200).send("ERROR");
        else res.render("clubdetail",{
            Club: data.rows[0] 
        });
        // else res.send(data.rows[0]);
    })
})

app.get("/players",(req,res)=>{
    res.render('Players');
})

app.get('/getplayers',(req,res)=>{
    pool.query(`select ct.*,db.ten from cauthu ct,doibong db where ct.maclb = db.maclb `,(err,data)=>{
        if(err) res.status(500).send({success:0,err:"error"});
        else res.status(201).send({success:1,players:data.rows});
    })
})

app.post('/getplayername',(req,res)=>{
   
    pool.query(`select ct.*,db.ten from cauthu ct,doibong db 
    where ct.maclb = db.maclb and lower(tencauthu) like '%${req.body.name}%'`,
    (err,data)=>{
        if(err) res.status(500).send({success:0,err:"error"});
        else res.status(201).send({success:1,players:data.rows});
    })
})

app.get('/player/:id/:playername',(req,res)=>{
    var idplayer = req.params.id
    pool.query(`select ct.*,db.ten as caulacbo from cauthu ct,doibong db
                where ct.maclb = db.maclb and ct.msct = '${idplayer}'
    `,(err,data)=>{
        if(err) res.status(500).send({success:0,err:'Error'});
        else res.render('playerdetail',{
            player:data.rows[0]
        })
    })
})
app.get('/bxh',(req,res)=>{
    res.render('bxh');
})

app.get("/bangxephang", function (req,res) {
    pool.connect(function(err, client, done){
        if(err){
            return console.error("error fetching client from pool")
        }
        client.query('SELECT * FROM doibong ORDER BY diem DESC , (sobanthang-sobanthua) DESC, sobanthang DESC, ten', function(err, result){
            done();

            if(err){
                res.end();
                return console.error('error running query', err);
            }
           res.status(201).send({Clb:result.rows})
        });
    });
})

app.get('/match',(req,res)=>{
    res.render('LichThiDau');
})


app.get('/trandau',(req,res)=>{
    pool.query(`select td.*, db.ten as ten,db.maclb as maclb,db.logourl as logourl from trandau td,doibong db
    where td.madoinha = db.maclb or td.madoikhach = db.maclb
    order by vongdau , matran`,(err,data)=>{
        if(err) res.status(500).send({success:0,err:"error"})
        else {
            for(var i=0 ; i< data.rows.length ;i = i+2){
                if(data.rows[i].maclb == data.rows[i].madoikhach){
                    var tmp = data.rows[i];
                    data.rows[i] = data.rows[i+1];
                    data.rows[i+1] = tmp;
                }
            }
            res.status(201).send({success:1,matchs:data.rows})
        }
    })
})

app.get('/match/:Idtran',(req,res)=>{
    // console.log("run")
    var idtran = req.params.Idtran;
    pool.query(`
    select td.*, db.ten as ten,db.maclb as maclb from trandau td,doibong db
    where (td.madoinha = db.maclb or td.madoikhach = db.maclb) and td.matran = '${idtran}'
    `,(err,data)=>{
        if(err) res.status(500).send({success:0,Err:"ERROR"})
        else{ 
            if( data.rows.length >0 ){
                // console.log( data);
                if(data.rows[0].maclb == data.rows[0].madoikhach ){
                    var tmp = data.rows[0];
                    data.rows[0] = data.rows[1];
                    data.rows[1] = tmp;
                }
                // console.log(data.rows[0])
                res.render('match',{
                    trandau: data.rows[0],
                    trandau1:data.rows[1]
                })  
        }}
    })
})

app.listen(6969,(err)=>{
    if(err) console.log(err);
    else console.log("Server ready !!!");
})