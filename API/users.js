//create mini express app
const exp=require('express')
const userApi=exp.Router();
const mc=require('mongodb').MongoClient
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const expressErrorHandler=require('express-async-handler')
//add body parsing middlewares

userApi.use(exp.json())

//create a new user
userApi.post("/createuser",expressErrorHandler( async (req,res)=>{
    //get user obj
    let userCollectionObj=req.app.get('UsersCollectionObj')
    //get user obj
    let newUser=req.body;
    console.log(newUser.mail)
    let user=await userCollectionObj.findOne({mail: newUser.mail})
    if(user===null){
        //hash the possword
        let hashedPassword=await bcryptjs.hash(newUser.password,2);
        newUser.password=hashedPassword
        //create new user
        userCollectionObj.insertOne(newUser,(err,success)=>{
            if(err){
                console.log("error in creating new user")
                res.send({message:err.message})
            }
            else{
                res.send({message:"New user created"})
            }
        })
    }
    else{
        res.send({message:"User already exsists"})
    }
        
}))
    



//login implementation
userApi.post('/login',expressErrorHandler(async (req,res)=>{
    let userCollectionObj=req.app.get('UsersCollectionObj')
    //get user credentials
    let credentials=req.body;
    let user=await userCollectionObj.findOne({mail:credentials.mail})
    if(user===null){
        res.send({message:"Invalid mail id"})
    }
    else{
        let result=await bcryptjs.compare(credentials.password,user.password)
        if(result===false){
            res.send({message:"Invalid password"})
        }
        else{
            let signedToken=jwt.sign({username:credentials.username},'abcdef',{expiresIn:'24h'})
            res.send({message:"Login success",token:signedToken})
        }
    }
}))

module.exports=userApi;