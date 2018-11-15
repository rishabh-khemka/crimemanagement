var express= require("express"),
    router=express.Router();
     var connection = require("./database");
 
 router.post("/fir/addnew", function(req,res){
     
       var fir_no= req.body.fir_no,
         fir_type = req.body.fir_type,
         fir_time = req.body.fir_time,
          fir_date= req.body.fir_date,
          case_no= req.body.case_no,
          fir_desc=req.body.fir_desc,
          fir_ct=req.body.fir_ct,
          fir_cp=req.body.fir_cp,
          fir_suspect=req.body.fir_suspect,
          fir_by=req.body.fir_by;
      var sql="INSERT INTO fir (fir_no, fir_type, fir_date, fir_time, case_no, fir_desc, fir_ct, fir_cp, fir_suspect, fir_by) VALUES (?,?,?,?,?,?,?,?,?,?)";
      connection.query(sql,[fir_no, fir_type, fir_date, fir_time, case_no, fir_desc, fir_ct, fir_cp, fir_suspect, fir_by], function (error, result) {
        if(error) {req.flash("error", "Sorry, Wrong Input");
            res.redirect("/fir/addnew");}
            else{
          req.flash("success","Data successfully added to the list");
        res.redirect("/fir");  
      }
        
      });
      
    });
     router.post("/fir/delete", function(req,res){
       var   fir_no= req.body.fir_no;
      var sql="DELETE FROM fir WHERE fir_no=?";
      var sql1="SELECT * FROM fir WHERE fir_no=?";
      connection.query(sql1,[fir_no], function(error1, result1){
          if(error1){
          req.flash("error", "Something went wrong");
              res.redirect("/fir/delete");}
            else if(result1=="")
            {
                req.flash("error", "Case number not present");
               res.redirect("/fir/delete");
            }
            else{
                connection.query(sql,[fir_no], function (error, result) {
        if(error) res.redirect("/fir/delete");
        else{
                req.flash("success","Data deleted from the list");
              res.redirect("/fir");
        }
      });
    }
      });
      
    });
    
 router.get("/fir/delete/:id", function(req,res){
       var   fir_no= req.params.id;
      var sql="DELETE FROM fir WHERE fir_no=?";
      var sql1="SELECT * FROM fir WHERE fir_no=?";
      connection.query(sql1,[fir_no], function(error1, result1){
          if(error1){
          req.flash("error", "Something went wrong");
              res.redirect("/fir/delete");}
            else if(result1=="")
            {
                req.flash("error", "Case number not present");
               res.redirect("/fir/delete");
            }
            else{
                connection.query(sql,[fir_no], function (error, result) {
        if(error) res.redirect("/fir/delete");
        else{
                req.flash("success","Data deleted from the list");
              res.redirect("/fir");
        }
      });
    }
      });
      
    });
    
    
router.get("/fir/edit/:id", function(req,res){
     var id=req.params.id;
     var sql="select * from fir where fir_no = ?";
     connection.query(sql,[id], function (err, result){
         if(err){
             req.flash("error", "Something went wrong");
             res.redirect("/fir");
         }
         else{
             var obj={print1: result};
             res.render("fir/FIRedit",obj);
         }
     });
});

router.get("/fir/show/:id", function(req,res){
     var id=req.params.id;
     var sql="select * from fir where fir_no = ?";
     connection.query(sql,[id], function (err, result){
         if(err){
             req.flash("error", "Something went wrong");
             res.redirect("/fir");
         }
         else{
             var obj={print1: result};
             res.render("fir/FIRshow",obj);
         }
     });
});
    
router.post("/fir/edit/:id",function(req,res){
var   fir_no1= req.params.id,
        fir_no=req.body.fir_no,
        fir_type=req.body.fir_type,
        fir_time=req.body.fir_time,
        fir_date=req.body.fir_date,
        case_no=req.body.case_no,
        fir_desc=req.body.fir_desc,
          fir_ct=req.body.fir_ct,
          fir_cp=req.body.fir_cp,
          fir_suspect=req.body.fir_suspect,
          fir_by=req.body.fir_by;
     var sql="UPDATE fir SET fir_no=?, fir_type=?, fir_time=?, fir_date=?,case_no=?, fir_desc=?, fir_ct=?, fir_cp=?, fir_suspect=?, fir_by=?   WHERE fir_no=?";
     connection.query(sql,[fir_no, fir_type, fir_time, fir_date, case_no, fir_desc, fir_ct, fir_cp, fir_suspect, fir_by, fir_no1],function(err,result){
         if(err){ 
                req.flash("error", "Invalid Input");
                res.redirect("/fir/edit/"+fir_no1);
        }
        else{
            req.flash("success", "Data successfully updated");
            res.redirect("/fir/show/"+fir_no1);
        }
    });
});
    
 router.get("/fir/addnew", function(req,res){
   res.render("fir/FIRform"); 
 });

router.get("/fir/delete", function(req,res){
   res.render("fir/FIRdelete"); 
 });
 
router.get("/fir", function(req, res){
    connection.query('SELECT * FROM fir ', function (error, results, fields) {
        if(error){ 
            req.flash("error", "Sorry, Something went wrong");
            res.redirect("/");
        }else{
        var obj={print: results};
        res.render("fir/FIR",obj);}
    });
});
router.get("/fir/:id", function(req,res){
   console.log(req.params.id) ;
   
   res.redirect("/fir");
 });

router.post("/fir/search", function(req,res){
    var   crt_id1= req.body.fir_id1;
    var sql='call search_fir(?)';
    connection.query(sql,['%'+crt_id1+'%'], function (error, results, fields) {
        if(error){ 
            req.flash("error", "Sorry, Something went wrong");
            res.redirect("/fir");
        }
        else{
             var obj={print: results[0]};
             res.render("fir/FIR",obj);
        }
    }
);
}
);
module.exports=router;
