var express = require("express");
var app = express();
const path = require("path");
const flash = require('connect-flash');

app.use(flash());
var session = require('express-session');
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,

}))

var date_time = new Date();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
 var mysql = require("mysql");
src="https://code.jquery.com/jquery-3.3.1.min.js"
        
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Shardul@26",
    database: "EJSP",
  });

  var bodyParser = require('body-parser');

  app.use(express.static(__dirname + '/public'));
  
  app.use(bodyParser.urlencoded({
     extended: false
  }));
  
  app.use(bodyParser.json());

app.get("/", function (req, res) {
 
  app.use(express.static(path.join(__dirname, "public")));
  con.connect(function (err) {
    if (err) console.log("Ërror");

    console.log("Connected");
    req.flash('message','')
    res.render("pages/Login",{message:req.flash('message')});
    
  });
});

app.use(express.static(path.join(__dirname, "public")));
app.get("/Main", (req, res) => {
  console.log(req.session);
  if(req.session.Email){
    req.flash('message','Login Successful')
  res.render("pages/Main",{name:req.session.Name,message:req.flash('message')});}
  else{
    req.flash('message','Please Login')
    res.redirect("/Login");
  }
});
app.get("/Register", (req, res) => {
  res.render("pages/Register");

});
app.get("/Contact", (req, res) => {
  
  //res.render("pages/Contact");
  if(req.session.Email){
   
  res.render("pages/Contact");}
  else{
    req.flash('message','Please Login')
    res.redirect("/Login");
  }





});
app.get("/Product", (req, res) => {
  // req.flash('message',' ')
  // res.render("pages/Product",{message:req.flash('message')});
  if(req.session.ProductName){
   
   
    res.render("pages/Product",{Proname:req.session.ProductName,message:req.flash('message')});}
    else{
     req.flash('message',' ')
     req.flash('Proname',' ')
  res.render("pages/Product",{Proname:req.flash('Proname'),message:req.flash('message')});
    }
});
app.get("/About", (req, res) => {
 // res.render("pages/About");
 if(req.session.Email){
   
  res.render("pages/About");}
  else{
    req.flash('message','Please Login')
    res.redirect("/Login");
  }


});

app.get("/Login", (req, res) => {

  res.render("pages/Login",{message:req.flash('message')});
});
app.get("/Receipt", (req, res) => {
  res.render("pages/Receipt");
});
app.get("/logout-user", (req, res) => {
  req.session.destroy((err)=>{
    if(err)
    {
      console.log(err);
    }
    else{
      
      res.redirect("/Login")
    }
  })
})
      
app.post('/register',function(req,res){

  con.query("Insert into Member Values ('"+req.body.names+"','"+req.body.Email+"','"+req.body.pass+"',"+req.body.phnum+",'"+req.body.add+"')", function (err) {
    if (err) {
      console.log(err)
    };
    req.flash('message','Added Successfully')
    console.log("1 record inserted");
    res.redirect("/Login");
  
  });



})

app.post('/login',function(req,res){
  let name = req.body.Name;
        let email = req.body.Email;
       let pass = req.body.pass;
     //  console.log(email);
  con.query("select * from Member where Email=? and Password=?",[email,pass],function (error,results,fields) {
    if(error){
      res.send("Error occured")
    }
    if (results.length>0) {
      
      sess = req.session;
      sess.Name = name;
      sess.Email=email;
     
      res.redirect("/Main");
    }
    else{
      req.flash('message','Inavlaid Email or Password')
      res.redirect("/Login");
     
    }

      res.end();
  });

})

app.post('/Pay',function(req,res){
  let date_time = new Date();
  var dd = String(date_time.getDate()).padStart(2, '0');
var mm = String(date_time.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = date_time.getFullYear();

date_time =  yyyy + '-' + mm + '-' +dd;

  

  con.query("Insert into payment Values ('"+req.body.ProductName+"','"+req.body.Email+"','"+date_time+"')",function (err) {
    if (err) {
      res.send(err)
    }
    
    else{
      sess = req.session;
      sess.ProductName = req.body.ProductName;
      req.flash('message','Orderd Succussfully ')
    res.redirect('/Product');
  }
  
  });
  
});
  
 





app.listen(5000);
console.log("Node 5000");
