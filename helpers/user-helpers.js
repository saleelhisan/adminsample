var db = require('../config/connection')
const bcrypt = require('bcrypt')
module.exports={
    dosignup: (userData) => {
        let response={}
        return new Promise(async (resolve, reject) => {
            let user=await db.get().collection('user').findOne({email:userData.email})
            if(user){
                resolve(response.status=false)
            }else{
                userData.password=await bcrypt.hash(userData.password,10)
                db.get().collection('user').insertOne(userData).then((req,res)=>{
                    resolve(response.status=true)
                })
            }
        })
    },                                                                 //inserting data to the database  
    // dosignup:(userData)=>{
    //     return new Promise(async(resolve,reject)=>{
    //         userData.password=await bcrypt.hash(userData.password,10)
    //         db.get().collection('user').insertOne(userData).then((response)=>{
    //             resolve(response)   
    //         })   
    //     })
         
    // },
    doLogin:(userData)=>{                                                                          
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response = {}
            let user = await db.get().collection('user').findOne({email:userData.email})           //whether email existing                                                             
            if(user){
                bcrypt.compare(userData.password, user.password).then((status) => {                //authenticating password  
                  
                    if(status){
                        console.log("login success");
                        response.user=user
                        response.status=true
                        resolve(response)
                    }
                    else{
                        console.log("login failed");
                        resolve({status:false})
                    }
                })

            }else{
                console.log("login failed error");
                resolve({status:false})
            }
        })
    }
}