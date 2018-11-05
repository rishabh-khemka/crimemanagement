var express= require("express"),
    router=express.Router();
    var connection = require("./database");
 
 router.post("/courts/addnew", function(req,res){
      
       var   crt_id= req.body.crt_id,
          crt_name= req.body.crt_name,
          crt_place= req.body.crt_place,
          crt_type= req.body.crt_type;
      var sql="INSERT INTO courts (crt_id, crt_name, crt_place, crt_type) VALUES (?,?,?,?)";
      connection.query(sql,[crt_id, crt_name, crt_place, crt_type], function (error, result) {
        if(error){
          req.flash("error", "Sorry, Wrong Input");
        res.redirect("/courts/addnew");}
        else{
            req.flash("success","Data successfully added to the list");
            res.redirect("/courts");
        }
      });
    });
    

 router.post("/courts/delete", function(req,res){
      
       var   crt_id= req.body.crt_id;
      var sql="DELETE FROM courts WHERE crt_id=?";
      var sql1="SELECT * FROM courts WHERE crt_id=?";
      connection.query(sql1,[crt_id], function(error1, result1){
          if(error1){
              req.flash("error", "Something went wrong");
              res.redirect("/courts/delete");
          }
          else if(result1=="")
          {
              req.flash("error", "Court ID not present");
              res.redirect("/courts/delete");
              
          }
          else{
                  connection.query(sql,[crt_id], function (error, result) {
                    if(error) res.redirect("/courts/delete");
                    else{
                        req.flash("success","Data deleted from the list");
                      res.redirect("/courts");
                  }
                  });
          }
      });
 });
    
     router.get("/courts/delete/:id", function(req,res){
       var   crt_id= req.params.id;
      var sql="DELETE FROM courts WHERE crt_id=?";
      var sql1="SELECT * FROM courts WHERE crt_id=?";
      connection.query(sql1,[crt_id], function(error1, result1){
          if(error1){
              req.flash("error", "Something went wrong");
              res.redirect("/courts/delete");
          }
          else if(result1=="")
          {
              req.flash("error", "Court ID not present");
              res.redirect("/courts/delete");
              
          }
          else{
                  connection.query(sql,[crt_id], function (error, result) {
                    if(error) res.redirect("/courts/delete");
                    else{
                        req.flash("success","Data deleted from the list");
                      res.redirect("/courts");
                  }
                  });
          }
      });
 });
 
 router.get("/courts/edit/:id", function(req,res){
     var id=req.params.id;
     var sql="select * from courts where crt_id = ?";
     connection.query(sql,[id], function (err, result){
         if(err){
             req.flash("error", "Something went wrong");
             res.redirect("/courts");
         }
         else{
             var obj={print1: result};
             res.render("courts/courtsedit",obj);
         }
     });
});
    
router.post("/courts/edit/:id",function(req,res){
var   crt_id1= req.params.id,
        crt_id=req.body.crt_id,
        crt_name=req.body.crt_name,
        crt_place=req.body.crt_place,
        crt_type=req.body.crt_type;
     var sql="UPDATE courts SET crt_id=?, crt_name=?, crt_place=?, crt_type=? WHERE crt_id=?";
     connection.query(sql,[crt_id, crt_name, crt_place, crt_type, crt_id1],function(err,result){
         if(err){ 
                req.flash("error", "Invalid Input");
                res.redirect("/courts/edit/"+ crt_id1);
        }
        else{
            req.flash("success", "Data successfully updated");
            res.redirect("/courts");
        }
    });
});
    
 router.get("/courts/addnew", function(req,res){
   res.render("courts/courtsform"); 
 });


router.get("/courts/delete", function(req,res){
   res.render("courts/courtsdelete"); 
 });
 
 
router.get("/courts", function(req, res){
    connection.query('SELECT * FROM courts ', function (error, results, fields) {
        if(error) throw error;
        var obj={print: results};
        res.render("courts/courts",obj);
    });
});

router.post("/courts/search", function(req,res){
    var   crt_id1= req.body.crt_id1;
    var sql='SELECT * FROM courts WHERE (crt_name LIKE ? OR crt_id LIKE ? OR crt_place LIKE ? OR crt_type LIKE ?)';
    connection.query(sql,['%'+crt_id1+'%','%'+crt_id1+'%','%'+crt_id1+'%','%'+crt_id1+'%'], function (error, results, fields) {
        if(error){ 
            req.flash("error", "Sorry, Something went wrong");
            res.redirect("/courts");
        }
        else{
             var obj={print: results};
             res.render("courts/courts",obj);
        }
    }
);
}
);

module.exports=router;
