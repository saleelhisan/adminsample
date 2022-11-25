var db = require('../config/connection')
const bcrypt = require('bcrypt')
const { response } = require('express')
module.exports={                                                                 //inserting data to the database  
    getAllUser:()=>{
                 return new Promise(async(resolve,reject)=>{
                     let users=await db.get().collection('user').find().toArray()   //function for getting user details
                     resolve(users)     
                 })
         },
         addUser:(user)=>{
            let response={}
            return new Promise(async(resolve,reject)=>{
                let userData=await db.get().collection('user').findOne({email:user.email})
                if(userData){
                    resolve(response.status=false)                    
                }else{
                    user.password=await bcrypt.hash(user.password,10)
                    db.get().collection('user').insertOne(user).then((req,res)=>{
                        resolve(response.status=true)
                    })
                }
            })
            },
                 deleteUser:(emailId)=>{
                    return new Promise((resolve,reject)=>{
                        db.get().collection('user').deleteOne({email:emailId}).then((response)=>{              //admin deleting user 
                            console.log('User deleted');
                            resolve(response)     
                        })
                    })
                },
                getUserDetails:(emailId)=>{
                    return new Promise((resolve,reject)=>{
                        db.get().collection('user').findOne({email:emailId}).then((user)=>{
                            resolve(user)
                        })
                    })
                },
                editUser:(emailId,userDetails)=>{
                    return new Promise(async(resolve,reject)=>{
                       password=await bcrypt.hash(userDetails.password,10)
                        db.get().collection('user').updateOne({email:emailId},{$set:{
                            name:userDetails.name,
                            email:userDetails.email,
                            password:password
                        }}).then((response)=>{
                            resolve()
                        })
                    })
                },
                addAdmin:(data)=>{
                    let response={}
                    return new Promise(async(resolve,reject)=>{
                        let admindata=await db.get().collection('admin').findOne({email:data.email})
                        if(admindata){
                            console.log("admin already exists");
                            resolve(response.status=false)
                        }else{
                            data.password=await bcrypt.hash(data.password,10)
                            db.get().collection('admin').insertOne(data).then((req,res)=>{
                                resolve(resolve.status=true)
                            })
                        }
                    })
                },
                adminLogin:(data)=>{
                    return new Promise(async(resolve,reject)=>{
                        let loginstatus = false
                        let response = {}
                        let admin = await db.get().collection('admin').findOne({email:data.email})
                        if (admin){
                            bcrypt.compare(data.password,admin.password).then((status)=>{
                                if(status){
                                    console.log('Admin access success');
                                    response.user = admin
                                    response.status = true
                                    resolve(response)
                                }else{
                                console.log('access denied');
                                resolve({status:false})
                                }
                            })
                        }else{
                            console.log('no user exists');
                            resolve({status:false})
                        }
                    })
                }
                    

                
              

}