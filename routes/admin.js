var express = require('express');
var router = express.Router();
var adminHelpers = require('../helpers/admin-helpers');
var db = require('../config/connection');
const {route} = require('./user')
/* GET users listing. */
router.get('/', function(req, res, next) {
  adminHelpers.getAllUser().then((allUsers)=>{ 
    let adminsession = req.session.admin
    if(adminsession){
      res.render('admin/view-user',{admin:true,allUsers,adminsession});   //setting admin exist
    }else{
      res.redirect('/admin/admin-login')
    }
    
  }) 
 
});
router.get('/add-user',(req,res)=>{
  let adminsession = req.session.admin
  res.render('admin/add-user',{addUserError: req.session.addUserError,admin: adminsession})
  req.session.addUserError = false  
  //res.render('admin/add-user')                                                   
})

router.post('/add-user',function (req,res,next){              //calling addUser function while submitting the adduserform  result is a callback

  adminHelpers.addUser(req.body).then((response)=>{           //passing user details req.body to addUser function
    console.log(response);
    if(response){
      res.redirect('/admin')
    }else{
      req.session.addUserError = "entered mail is already exist"
      res.redirect('/admin/add-user')
    }
    
  })
})                 


router.get('/delete-user/:email',(req,res)=>{
  let userEmail = req.params.email                                //deletting user data
  console.log(userEmail);                                  
  adminHelpers.deleteUser(userEmail).then((response)=>{
    res.redirect('/admin')
  })

})

router.get('/edit-user/:email',async(req,res)=>{                //editting user data
  let adminsession = req.session.admin

  let userMail = req.params.email
  console.log(req.params.email);
  // this user is passed to edit page to set value fields
  let user = await db.get().collection('user').findOne({ email: userMail })
  console.log(user);
  //provide get method only,post method same as add-users
  res.render('admin/edit-user', { user, admin: true, adminsession })

})
router.post('/edit-user/:email',(req,res)=>{                        //user edited
  adminHelpers.editUser(req.params.email,req.body).then(()=>{
    res.redirect('/admin')
  })
})
router.get('/admin-login',(req,res)=>{
  let admin = req.session.admin
  if (admin){
    res.redirect('/admin')
  }else{
    res.render('admin/admin-login',{admin:true,adminLoginError:req.session.adminLoginError})
    req.session.adminLoginError=false
  }
})
router.post('/admin-login',(req,res)=>{
  adminHelpers.adminLogin(req.body).then((response)=>{
    if (response.status){
      req.session.loggedIn = true
      req.session.admin = response.user
      // console.log(req.session.user);
      res.redirect('/admin')
    }else{
      req.session.adminLoginError = "invalid email or password"
      res.redirect('/admin/admin-login')
    }
  })
})
router.get('/admin-signup',(req,res)=>{
  let adminsession=req.session.admin
  res.render('admin/admin-signup', {admin:true, addadminError: req.session.addadminError, adminsession})
  req.session.addadminError=false
 z
})
router.post('/admin-signup',(req,res)=>{                                    //adding admin to the database
  console.log(req.body);  
  adminHelpers.addAdmin(req.body).then((response)=>{
    if(response){
    res.redirect('/admin/admin-login')
  }else{
    req.session.addAdminError="email already exists!!"
    res.redirect('/admin/admin-signup')
  }
  })
})

router.get('/admin-logout',(req,res)=>{
  // req.session.destroy(()=>{
      req.session.admin=null
  res.redirect('/admin/admin-login')
  // })
})



module.exports = router;
