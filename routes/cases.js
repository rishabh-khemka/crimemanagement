var express= require("express"),
    router=express.Router();
    var connection = require("./database");
 
 
 router.post("/cases/addnew", function(req,res){
      
    var   case_no= req.body.case_no,
          case_type= req.body.case_type,
          p_id= req.body.p_id,
          crt_id= req.body.crt_id;
    var sql="INSERT INTO cases (case_no, case_type, p_id, crt_id) VALUES (?,?,?,?)";
    connection.query(sql,[case_no, case_type, p_id, crt_id], function (error, result) {
        if(error){ 
                req.flash("error", "Wrong input, please try again");
                res.redirect("/cases/addnew");
        }
        else{
            req.flash("success", "Data successfully added to the list");
            res.redirect("/cases");
        }
    });
});
    
    
router.post("/cases/delete", function(req,res){
    var   case_no= req.body.case_no;
    var sql="DELETE FROM cases WHERE case_no=?";
    var sql1="SELECT * FROM cases WHERE case_no=?";
    connection.query(sql1,[case_no], function(error1, result1){
        if(error1) {
                    req.flash("error", "Something went wrong");
                    res.redirect("/cases/delete");
        }
        else if(result1==""){
                    req.flash("error", "Case number not present");
                    res.redirect("/cases/delete");
        }
        else{
                    connection.query(sql,[case_no], function (error, result) {
                    if(error){ 
                                req.flash("error", "Sorry, Wrong Case no");
                                res.redirect("/cases/delete");
                    }
                    else{
                                req.flash("success","Data deleted from the list");
                                res.redirect("/cases");
                    }
                    });
        }
        });
});
    
router.get("/cases/delete/:id", function(req,res){
    var   case_no= req.params.id;
    var sql="DELETE FROM cases WHERE case_no=?";
    var sql1="SELECT * FROM cases WHERE case_no=?";
    connection.query(sql1,[case_no], function(error1, result1){
        if(error1) {
                    req.flash("error", "Something went wrong");
                    res.redirect("/cases/delete");
        }
        else if(result1==""){
                    req.flash("error", "Case number not present");
                    res.redirect("/cases/delete");
        }
        else{
                    connection.query(sql,[case_no], function (error, result) {
                    if(error){ 
                                req.flash("error", "Sorry, Wrong Case no");
                                res.redirect("/cases/delete");
                    }
                    else{
                                req.flash("success","Data deleted from the list");
                                res.redirect("/cases");
                    }
                    });
        }
        });
});

router.get("/cases/edit/:id", function(req,res){
     var id=req.params.id;
     var sql="select * from cases where case_no = ?";
     connection.query(sql,[id], function (err, result){
         if(err){
             req.flash("error", "Something went wrong");
             res.redirect("/cases");
         }
         else{
             var obj={print1: result};
             res.render("cases/casesedit",obj);
         }
     });
});
    
router.post("/cases/edit/:id",function(req,res){
var   case_no1= req.params.id,
        case_no=req.body.case_no,
        case_type=req.body.case_type,
        p_id=req.body.p_id,
        crt_id=req.body.crt_id;
     var sql="UPDATE cases SET case_no=?, case_type=?, p_id=?, crt_id=? WHERE case_no=?";
     connection.query(sql,[case_no, case_type, p_id, crt_id, case_no1],function(err,result){
         if(err){ 
                req.flash("error", "Invalid Input");
                res.redirect("/cases/edit/"+case_no1);
        }
        else{
            req.flash("success", "Data successfully updated");
            res.redirect("/cases");
        }
    });
});
     
    
router.get("/cases/addnew", function(req,res){
   res.render("cases/casesform"); 
});



router.get("/cases/delete", function(req,res){
   res.render("cases/casesdelete"); 
});
 


router.get("/cases", function(req, res){
    connection.query('SELECT * FROM cases ', function (error, results, fields) {
        if(error){ 
            req.flash("error", "Sorry, Something went wrong");
            res.redirect("/");
        }
        else{
             var obj={print: results};
             res.render("cases/cases",obj);
        }
    });
});

router.post("/cases/search", function(req,res){
    var   crt_id1= req.body.fir_id1;
    var sql='SELECT * FROM cases WHERE (case_type LIKE ? OR case_no LIKE ? OR p_id LIKE ? OR crt_id LIKE ?)';
    connection.query(sql,['%'+crt_id1+'%','%'+crt_id1+'%','%'+crt_id1+'%','%'+crt_id1+'%'], function (error, results, fields) {
        if(error){ 
            req.flash("error", "Sorry, Something went wrong");
            res.redirect("/cases");
        }
        else{
             var obj={print: results};
             res.render("cases/cases",obj);
        }
    }
);
}
);


module.exports=router;
