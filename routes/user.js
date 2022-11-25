const { response } = require('express');
var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  let user = req.session.user
  let products=[{
    name:"Galaxy M53",
    category:"mobile",
    description:"6 gb 128 black",
    image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-m536bzgfinu/gallery/in-galaxy-m53-5g-sm-m536-421705-sm-m536bzgfinu-532184979?$2052_1641_PNG$"
  },{
    name:"Galaxy A30",
    category:"mobile",
    description:"8 gb 256 black",
    image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-m536bzgfinu/gallery/in-galaxy-m53-5g-sm-m536-421705-sm-m536bzgfinu-532184979?$2052_1641_PNG$"
  },{
    name:"Galaxy M31s",
    category:"mobile",
    description:"6 gb 128 black",
    image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-m536bzgfinu/gallery/in-galaxy-m53-5g-sm-m536-421705-sm-m536bzgfinu-532184979?$2052_1641_PNG$"
  },{
    name:"Galaxy Z series",
    category:"mobile",
    description:"8 gb 1tb black",
    image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-m536bzgfinu/gallery/in-galaxy-m53-5g-sm-m536-421705-sm-m536bzgfinu-532184979?$2052_1641_PNG$"
  },{
    name:"Galaxy M53",
    category:"mobile",
    description:"6 gb 128 black",
    image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-m536bzgfinu/gallery/in-galaxy-m53-5g-sm-m536-421705-sm-m536bzgfinu-532184979?$2052_1641_PNG$"
  },{
    name:"Galaxy A30",
    category:"mobile",
    description:"8 gb 256 black",
    image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-m536bzgfinu/gallery/in-galaxy-m53-5g-sm-m536-421705-sm-m536bzgfinu-532184979?$2052_1641_PNG$"
  },{
    name:"Galaxy M31s",
    category:"mobile",
    description:"6 gb 128 black",
    image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-m536bzgfinu/gallery/in-galaxy-m53-5g-sm-m536-421705-sm-m536bzgfinu-532184979?$2052_1641_PNG$"
  },{
    name:"Galaxy Z series",
    category:"mobile",
    description:"8 gb 1tb black",
    image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-m536bzgfinu/gallery/in-galaxy-m53-5g-sm-m536-421705-sm-m536bzgfinu-532184979?$2052_1641_PNG$"
  },{
    name:"Galaxy M53",
    category:"mobile",
    description:"6 gb 128 black",
    image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-m536bzgfinu/gallery/in-galaxy-m53-5g-sm-m536-421705-sm-m536bzgfinu-532184979?$2052_1641_PNG$"
  },{
    name:"Galaxy A30",
    category:"mobile",
    description:"8 gb 256 black",
    image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-m536bzgfinu/gallery/in-galaxy-m53-5g-sm-m536-421705-sm-m536bzgfinu-532184979?$2052_1641_PNG$"
  },{
    name:"Galaxy M31s",
    category:"mobile",
    description:"6 gb 128 black",
    image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-m536bzgfinu/gallery/in-galaxy-m53-5g-sm-m536-421705-sm-m536bzgfinu-532184979?$2052_1641_PNG$"
  },{
    name:"Galaxy Z series",
    category:"mobile",
    description:"8 gb 1tb black",
    image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-m536bzgfinu/gallery/in-galaxy-m53-5g-sm-m536-421705-sm-m536bzgfinu-532184979?$2052_1641_PNG$"
  }]
  if(user){
    res.render('user/index', {products,user});
  }else{
    res.redirect('/login')
  } 
});
router.get('/signup',(req,res)=>{
  res.render('user/signup',{signupError:req.session.signupError})
  req.session.signupError=false
});

router.get('/login',(req,res)=>{                                 //login routes to user/login page                                 
  let user = req.session.user
  if(user){
    res.redirect('/')
  }else{
    res.render('user/login',{"loginError":req.session.loginError})
    req.session.loginError=false
  }                                      
})

router.post('/signup',(req,res)=>{                                   //entering user data to database
  userHelpers.dosignup(req.body).then((response)=>{
    console.log(response);
    if(response){
    res.redirect('/login')
  }else{
    req.session.signupError=true
    res.redirect('/signup')
  }
  })
})
router.post('/login',function(req,res){
  userHelpers.doLogin(req.body).then((response)=>{                    
    if(response.status){                                          //if success redirect to login Page else redirect again login page 
       req.session.user=true  
       req.session.user=response.user                                             
      res.redirect('/')
    }else{
      req.session.loginError="Invalid email or password"
      res.redirect('/login')                                                                                     
    }
    
  })
 
})
router.get('/logout',(req,res)=>{                           //destroying session while clicking logout
  req.session.user=null
  res.redirect('/login')
})

module.exports = router;
