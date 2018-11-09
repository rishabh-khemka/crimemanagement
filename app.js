var express= require("express");
var bodyparser =require("body-parser");
var app  = express();
var flash   = require("connect-flash");
var expressValidator = require('express-validator');
var expressSession = require('express-session');


var indexroutes = require("./routes/index");
var policeroutes = require("./routes/police");
var prisonersroutes = require("./routes/prisoners");
var casesroutes = require("./routes/cases");
var victimsroutes = require("./routes/victims");
var courtsroutes = require("./routes/courts");
var FIRroutes = require("./routes/fir");
 
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(flash());
app.use(expressSession({
    secret: "nssxmyxsbsbaxl!",
    resave: false,
    saveUninitialized: false
}));


app.use(function(req, res, next){
   res.locals.message = req.flash("error");
   res.locals.success=req.flash("success");
   next();
});

app.use(indexroutes);
app.use(policeroutes);
app.use(prisonersroutes);
app.use(casesroutes);
app.use(victimsroutes);
app.use(courtsroutes);
app.use(FIRroutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Server Has Started");
});


