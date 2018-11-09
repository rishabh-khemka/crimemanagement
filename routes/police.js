var express= require("express"),
    router=express.Router();
     var connection = require("./database");
 
 router.get("/police/admin/delete/:id", function(req, res){
     var id=req.params.id;
     var obj={print1: id};
    res.render("police/policeadmin2",obj);
});
 
 router.post("/police/admin/delete/:id", function(req, res){
    var user=req.body.username;
    var password=req.body.password;
    var id=req.params.id;
      connection.query('SELECT * FROM loginadmin WHERE username = ?',[user], function (error, results, fields) {
                 if (error) {
                         console.log("error ocurred",error);
                           
                   }
                   else
                   {
                       if(results.length >0)
                       {
                             if(results[0].password == password)
                             {
                                 res.redirect("/police/delete/"+id);
                             }
                              else
                              {
                                    req.flash("error", "Username and password do not match");
                                   
                                    res.redirect("/police/admin/delete/"+id);
                        }
                    }
                    else
                    {
                        req.flash("error", "You do not have permission for this action");
                                    res.redirect("/police/admin/delete/"+id);
                    }
                }
 });

});
router.get("/police/delete/:id", function(req,res){
      var   p_id= req.params.id;
      var sql="DELETE FROM police WHERE p_id=?";
      var sql1="SELECT * FROM police WHERE p_id=?";
    connection.query(sql1,[p_id], function(error1, result1){
        if(error1) {
                    req.flash("error", "Something went wrong");
                    res.redirect("/police/delete");
        }
        else if(result1==""){
                    req.flash("error", "Police ID not present");
                    res.redirect("/police/delete");
        }
        else{
                connection.query(sql,[p_id], function (error, result) {
                if(error){ 
                                req.flash("error", "Sorry, Wrong Police ID");
                                res.redirect("/police/delete");
                    }
                    else{
                                req.flash("success","Data deleted from the list");
                                res.redirect("/police");
                     }
                });
        }        
    });
});


router.get("/police/admin/delete", function(req, res){
    res.render("police/policeadmin1");
});


router.post("/police/admin/delete", function(req, res){
    var user=req.body.username;
    var password=req.body.password;
      connection.query('SELECT * FROM loginadmin WHERE username = ?',[user], function (error, results, fields) {
                 if (error) {
                         console.log("error ocurred",error);
                           
                   }
                   else
                   {
                       if(results.length >0)
                       {
                             if(results[0].password == password)
                             {
                                 res.redirect("/police/delete");
                             }
                              else
                              {
                                    req.flash("error", "Username and password do not match");
                                    res.redirect("/police/admin/delete");
                        }
                    }
                    else
                    {
                        req.flash("error", "You do not have permission for this action");
                                    res.redirect("/police/admin/delete");
                    }
                }
 });

});

 
router.get("/police/admin", function(req, res){
    res.render("police/policeadmin");
});


router.post("/police/admin", function(req, res){
    var user=req.body.username;
    var password=req.body.password;
      connection.query('SELECT * FROM loginadmin WHERE username = ?',[user], function (error, results, fields) {
                 if (error) {
                         console.log("error ocurred",error);
                           
                   }
                   else
                   {
                       if(results.length >0)
                       {
                             if(results[0].password == password)
                             {
                                 res.redirect("/police/addnew");
                             }
                              else
                              {
                                    req.flash("error", "Username and password do not match");
                                    res.redirect("/police/admin");
                        }
                    }
                    else
                    {
                        req.flash("error", "You do not have permission for this action");
                                    res.redirect("/police/admin");
                    }
                }
 });
});

 
 router.post("/police/edit/:id", function(req,res){
     var id=req.params.id;
          var user=req.body.username;
    var password=req.body.password;
     connection.query('SELECT * FROM loginadmin WHERE username = ?',[user], function (error, results){
         if (error) {
                         console.log("error ocurred",error);
                           
                   }
                   else
                   {
                       if(results.length >0)
                       {
                             if(results[0].password == password)
                             {
                                 res.redirect("/police/admin/edit/"+id);
                             }
                              else
                              {
                                    req.flash("error", "Username and password do not match");
                                    res.redirect("/police/edit/"+id);
                        }
                    }
                    else
                    {
                        req.flash("error", "You do not have permission for this action");
                                    res.redirect("/police/edit/"+id);
                    }
                }
 });
});

router.get("/police/admin/edit/:id", function(req,res){
     var id=req.params.id;
     var sql="select * from police where p_id = ?";
     connection.query(sql,[id], function (err, result){
         if(err){
             req.flash("error", "Something went wrong");
             res.redirect("/police");
         }
         else{
             var obj={print1: result};
             res.render("police/policeedit",obj);
         }
     });
});

 router.get("/police/edit/:id", function(req, res){
     var id=req.params.id;
     var obj={print1: id};
    res.render("police/policeadmin3",obj);
});
    
router.post("/police/admin/edit/:id",function(req,res){
var   p_id1= req.params.id,
        p_id=req.body.p_id,
        p_name=req.body.p_name,
       p_mobile=req.body.p_mobile,
        p_email=req.body.p_email,
        p_address=req.body.p_address,
         p_sal=req.body.p_sal,
          p_design=req.body.p_design;
     var sql="UPDATE police SET  p_id=?, p_name=?, p_mobile=?,  p_email=?, p_address=? ,p_sal=?, p_design=? WHERE p_id=?";
     connection.query(sql,[ p_id, p_name,  p_mobile,  p_email, p_address, p_sal, p_design, p_id1],function(err,result){
         if(err){ 
                req.flash("error", "Invalid Input");
                res.redirect("/police/admin/edit/"+p_id1);
        }
        else{
            req.flash("success", "Data successfully updated");
            res.redirect("/police");
        }
    });
});


router.post("/police/addnew", function(req,res){
    var   p_id= req.body.p_id,
          p_name= req.body.p_name,
          p_mobile= req.body.p_mobile,
          p_email= req.body.p_email,
          p_address= req.body.p_address,
          p_sal= req.body.p_sal,
          p_design= req.body.p_design;
    var sql="INSERT INTO police (p_id, p_name, p_mobile, p_email, p_address, p_sal, p_design) VALUES (?,?,?,?,?,?,?)";
    connection.query(sql,[p_id, p_name, p_mobile, p_email, p_address, p_sal, p_design], function (error, result) {
        if(error){ 
                req.flash("error", "Sorry, Wrong Input");
                res.redirect("/cases/addnew");
        }
        else{
            req.flash("success","Data successfully added to the list");
            
            res.redirect("/police");
        }
     });
});
    
    
router.post("/police/delete", function(req,res){
      var   p_id= req.body.p_id;
      var sql="DELETE FROM police WHERE p_id=?";
      var sql1="SELECT * FROM police WHERE p_id=?";
    connection.query(sql1,[p_id], function(error1, result1){
        if(error1) {
                    req.flash("error", "Something went wrong");
                    res.redirect("/police/delete");
        }
        else if(result1==""){
                    req.flash("error", "Police ID not present");
                    res.redirect("/police/delete");
        }
        else{
                connection.query(sql,[p_id], function (error, result) {
                if(error){ 
                                req.flash("error", "Sorry, Wrong Police ID");
                                res.redirect("/police/delete");
                    }
                    else{
                                req.flash("success","Data deleted from the list");
                                res.redirect("/police");
                     }
                });
        }        
    });
});
    
 router.get("/police/addnew", function(req,res){
   res.render("police/policeform"); 
 });


router.get("/police/delete", function(req,res){
   res.render("police/policedelete"); 
 });
 
 
router.get("/police", function(req, res){
    connection.query('SELECT * FROM police ', function (error, results, fields) {
        if(error){ 
            req.flash("error", "Sorry, Something went wrong");
            res.redirect("/");
        }
        else{
            var obj={print: results};
            res.render("police/police",obj);
        }
    });
});

router.post("/police/search", function(req,res){
    var   crt_id1= req.body.p_id1;
    var sql='SELECT * FROM police WHERE (p_name LIKE ? OR p_id LIKE ? OR p_mobile LIKE ? OR p_email LIKE ? OR p_address LIKE ? OR p_sal LIKE ? OR p_design LIKE ?)';
    connection.query(sql,['%'+crt_id1+'%','%'+crt_id1+'%','%'+crt_id1+'%','%'+crt_id1+'%','%'+crt_id1+'%','%'+crt_id1+'%','%'+crt_id1+'%'], function (error, results, fields) {
        if(error){ 
            req.flash("error", "Sorry, Something went wrong");
            res.redirect("/police");
        }
        else{
             var obj={print: results};
             res.render("police/police",obj);
        }
    }
);
}
);
module.exports=router;
