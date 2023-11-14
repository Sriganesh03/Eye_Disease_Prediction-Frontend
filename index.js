var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose") ;
const app = express()
app.set('view engine','ejs');
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Eye',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database Successsfully"))

// app.get('/prediction',(req,res)=>{
//     res.send("<script>alert('TERMS AND CONDITIONS: All the images provided by the user will be used for medical purpose only and it will not be stored anywhere'); window.location.href = 'http://localhost:8501/';</script>")
// })

app.get('/precaution',(req,res)=>{
    res.render('precaution',{title:"Precaution Page"});
})

// app.get('/login',(req,res)=>{
//     res.render('login',{title:"Login"});
// })

// app.get('/register',(req,res)=>{
//     res.render('register',{title:"Register"});
// })

app.get("/hospitalrank", function (req, res) { 
    db.collection('Details').find().toArray(function(err, docs) {
        if(err){
            throw err;
        }
           res.render('hospitalrank',{details:docs});

      });
})


// app.post("/loginform", function (req, res) {  
//     db.collection('Register').countDocuments({name:req.body.username,email:req.body.email,pass:req.body.password},(err,obj)=>{
//         if (err) throw err
//         else if(obj==1){
//             res.send("<script>alert('You have Login Successfully.'); window.location.href = '/';</script>");
//         }
//         else{
//             res.send("<script>alert('Please Register First'); window.location.href = '/register';</script>");
//         }
//     })
// })

// app.post('/registerinfo',(req,res)=>{
//     if(req.body.pass!=req.body.conf-pass){
//         res.send("<script>alert('Mismatch password'); window.location.href = '/login';</script>");
//     }
//     db.collection("Register").insertOne(req.body,(err,result)=>{
//         if(err) throw err;
//         res.send("<script>alert('Registered Successfully');window.location.href=/")
//     })
//     res.render('home');
// })

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    res.render('home',{title:"Home Page"});
}).listen(7777);

console.log("Server started at http://localhost:7777");