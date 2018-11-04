var express= require("express"),
    router=express.Router();
    var mysql      = require('mysql');

var connection = mysql.createConnection({
    	host     : process.env.MYSQL_ADDON_HOST,
    	database : process.env.MYSQL_ADDON_DB,
    	user     : process.env.MYSQL_ADDON_USER,
    	password : process.env.MYSQL_ADDON_PASSWORD
  });
 
 
 router.post("/victims/addnew", function(req,res){
       var   vic_id= req.body.vic_id,
          vic_name= req.body.vic_name,
          vic_mobile= req.body.vic_mobile,
          vic_address= req.body.vic_address,
          fir_no = req.body.fir_no;
      var sql="INSERT INTO victims (vic_id, vic_name, vic_mobile, vic_address, fir_no) VALUES (?,?,?,?,?)";
      connection.query(sql,[vic_id, vic_name, vic_mobile, vic_address, fir_no], function (error, result) {
        if(error){ 
                req.flash("error", "Sorry, Wrong Input");
                res.redirect("/victims/addnew");
        }
        else{
            req.flash("success", "Data successfully added to the list");
            res.redirect("/victims");
        }
    });
});


 router.post("/victims/delete", function(req,res){
       var   vic_id= req.body.vic_id;
      var sql="DELETE FROM victims WHERE vic_id=?";
      var sql1="SELECT * FROM victims WHERE vic_id=?";
    connection.query(sql1,[vic_id], function(error1, result1){
        if(error1) {
                    req.flash("error", "Something went wrong");
                    res.redirect("/victims/delete");
        }
        else if(result1==""){
                    req.flash("error", "Victim ID not present");
                    res.redirect("/victims/delete");
        }
        else{
      connection.query(sql,[vic_id], function (error, result) {
       if(error){ 
                                req.flash("error", "Sorry, Wrong Case no");
                                res.redirect("/victims/delete");
                    }
                    else{
                                req.flash("success","Data deleted from the list");
                                res.redirect("/victims");
                    }
                });
    }
    });
});

router.get("/victims/delete/:id", function(req,res){
       var   vic_id= req.params.id;
      var sql="DELETE FROM victims WHERE vic_id=?";
      var sql1="SELECT * FROM victims WHERE vic_id=?";
    connection.query(sql1,[vic_id], function(error1, result1){
        if(error1) {
                    req.flash("error", "Something went wrong");
                    res.redirect("/victims/delete");
        }
        else if(result1==""){
                    req.flash("error", "Victim ID not present");
                    res.redirect("/victims/delete");
        }
        else{
      connection.query(sql,[vic_id], function (error, result) {
       if(error){ 
                                req.flash("error", "Sorry, Wrong Case no");
                                res.redirect("/victims/delete");
                    }
                    else{
                                req.flash("success","Data deleted from the list");
                                res.redirect("/victims");
                    }
                });
    }
    });
});


router.get("/victims/edit/:id", function(req,res){
     var id=req.params.id;
     var sql="select * from victims where vic_id = ?";
     connection.query(sql,[id], function (err, result){
         if(err){
             req.flash("error", "Something went wrong");
             res.redirect("/victims");
         }
         else{
             var obj={print1: result};
             res.render("victims/victimsedit",obj);
         }
     });
});
    
router.post("/victims/edit/:id",function(req,res){
var   vic_id1= req.params.id,
        vic_id=req.body.vic_id,
        vic_name=req.body.vic_name,
       vic_address=req.body.vic_address,
        vic_mobile=req.body. vic_mobile,
        fir_no=req.body.fir_no;
     var sql="UPDATE victims SET vic_id=?, vic_name=?,  vic_address=?, vic_mobile=? , fir_no=? WHERE vic_id=?";
     connection.query(sql,[vic_id, vic_name, vic_address, vic_mobile,fir_no, vic_id1],function(err,result){
         if(err){ 
                req.flash("error", "Invalid Input");
                res.redirect("/victims/edit/"+vic_id1);
        }
        else{
            req.flash("success", "Data successfully updated");
            res.redirect("/victims");
        }
    });
});
    
    
 router.get("/victims/addnew", function(req,res){
   res.render("victims/victimsform"); 
 });


router.get("/victims/delete", function(req,res){
   res.render("victims/victimsdelete"); 
 });
 
 
router.get("/victims", function(req, res){
    connection.query('SELECT * FROM victims ', function (error, results, fields) {
        if(error){ 
            req.flash("error", "Sorry, Something went wrong");
            res.redirect("/");
        }
        else{
        var obj={print: results};
        res.render("victims/victims",obj);
        }
    });
});

router.post("/victims/search", function(req,res){
    var   crt_id1= req.body.vic_id1;
    var sql='SELECT * FROM victims WHERE (vic_name LIKE ? OR vic_id LIKE ? OR vic_address LIKE ? OR vic_mobile LIKE ? OR fir_no LIKE ?)';
    connection.query(sql,['%'+crt_id1+'%','%'+crt_id1+'%','%'+crt_id1+'%','%'+crt_id1+'%','%'+crt_id1+'%'], function (error, results, fields) {
        if(error){ 
            req.flash("error", "Sorry, Something went wrong");
            res.redirect("/victims");
        }
        else{
             var obj={print: results};
             res.render("victims/victims",obj);
        }
    }
);
}
);
module.exports=router;
