var express= require("express"),
    router=express.Router();
    var mysql      = require('mysql');

var connection = mysql.createConnection({
    	host     : process.env.MYSQL_ADDON_HOST,
    	database : process.env.MYSQL_ADDON_DB,
    	user     : process.env.MYSQL_ADDON_USER,
    	password : process.env.MYSQL_ADDON_PASSWORD
  });
  
 router.post("/prisoners/addnew", function(req,res){
      
       var   pri_id= req.body.pri_id,
          pri_name= req.body.pri_name,
          pri_address= req.body.pri_address,
          pri_cellno= req.body.pri_cellno,
          p_id= req.body.p_id;
      var sql="INSERT INTO prisoners (pri_id, pri_name, pri_address, pri_cellno, p_id) VALUES (?,?,?,?,?)";
      connection.query(sql,[pri_id, pri_name, pri_address, pri_cellno, p_id], function (error, result) {
        if(error){ 
                    req.flash("error", "Sorry, Wrong Input");
            res.redirect("/prisoners/addnew");}
            else{
                req.flash("success", "Data successfully added to the list");
                res.redirect("/prisoners");}
      });
});


 router.post("/prisoners/delete", function(req,res){
       var   pri_id= req.body.pri_id;
      var sql="DELETE FROM prisoners WHERE pri_id=?";
      var sql1="SELECT * FROM prisoners WHERE pri_id=?";
    connection.query(sql1,[pri_id], function(error1, result1){
        if(error1) {
                    req.flash("error", "Something went wrong");
                    res.redirect("/prisoners/delete");
        }
        else if(result1==""){
                    req.flash("error", "Prisoner ID not present");
                    res.redirect("/prisoners/delete");
        }
        else{
                connection.query(sql,[pri_id], function (error, result) {
                if(error){
                            req.flash("error", "Sorry, Wrong Prisoner ID");
                            res.redirect("/prisoners/delete");
                    
                }
                else{
                            req.flash("success","Data deleted from the list");
                            res.redirect("/prisoners");
                }
                });
        }
        });
});
    
    router.get("/prisoners/delete/:id", function(req,res){
       var   pri_id= req.params.id;
      var sql="DELETE FROM prisoners WHERE pri_id=?";
      var sql1="SELECT * FROM prisoners WHERE pri_id=?";
    connection.query(sql1,[pri_id], function(error1, result1){
        if(error1) {
                    req.flash("error", "Something went wrong");
                    res.redirect("/prisoners/delete");
        }
        else if(result1==""){
                    req.flash("error", "Prisoner ID not present");
                    res.redirect("/prisoners/delete");
        }
        else{
                connection.query(sql,[pri_id], function (error, result) {
                if(error){
                            req.flash("error", "Sorry, Wrong Prisoner ID");
                            res.redirect("/prisoners/delete");
                    
                }
                else{
                            req.flash("success","Data deleted from the list");
                            res.redirect("/prisoners");
                }
                });
        }
        });
});

router.get("/prisoners/edit/:id", function(req,res){
     var id=req.params.id;
     var sql="select * from prisoners where pri_id = ?";
     connection.query(sql,[id], function (err, result){
         if(err){
             req.flash("error", "Something went wrong");
             res.redirect("/prisoners");
         }
         else{
             var obj={print1: result};
             res.render("prisoners/prisonersedit",obj);
         }
     });
});
    
router.post("/prisoners/edit/:id",function(req,res){
var   pri_id1= req.params.id,
        pri_id=req.body.pri_id,
        pri_name=req.body.pri_name,
        pri_address=req.body.pri_address,
        pri_cellno=req.body.pri_cellno,
        p_id=req.body.p_id;
     var sql="UPDATE prisoners SET  pri_id=?,  pri_name=?, pri_address=?, pri_cellno=? , p_id=? WHERE pri_id=?";
     connection.query(sql,[pri_id, pri_name, pri_address,  pri_cellno , p_id, pri_id1],function(err,result){
         if(err){ 
                req.flash("error", "Invalid Input");
                res.redirect("/prisoners/edit/"+pri_id1);
        }
        else{
            req.flash("success", "Data successfully updated");
            res.redirect("/prisoners");
        }
    });
});
    
    
 router.get("/prisoners/addnew", function(req,res){
   res.render("prisoners/prisonersform"); 
 });


router.get("/prisoners/delete", function(req,res){
   res.render("prisoners/prisonersdelete"); 
 });

 
 router.get("/prisoners", function(req, res){
    connection.query('SELECT * FROM prisoners ', function (error, results, fields) {
         if(error){ 
            req.flash("error", "Sorry, Something went wrong");
            res.redirect("/");
        }
        else{
        var obj={print: results};
        res.render("prisoners/prisoners",obj);
        }
    });
});

router.post("/prisoners/search", function(req,res){
    var   crt_id1= req.body.pri_id1;
    var sql='SELECT * FROM prisoners WHERE (pri_name LIKE ? OR pri_id LIKE ? OR pri_address LIKE ? OR pri_cellno LIKE ? OR p_id LIKE ?)';
    connection.query(sql,['%'+crt_id1+'%','%'+crt_id1+'%','%'+crt_id1+'%','%'+crt_id1+'%','%'+crt_id1+'%'], function (error, results, fields) {
        if(error){ 
            req.flash("error", "Sorry, Something went wrong");
            res.redirect("/prisoners");
        }
        else{
             var obj={print: results};
             res.render("prisoners/prisoners",obj);
        }
    }
);
}
);


module.exports=router;
