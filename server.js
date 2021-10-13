const exp=require('express');
const app=exp();
const path=require('path')
const mc=require('mongodb').MongoClient

app.use(exp.static(path.join(__dirname,'./dist/Assesment')))

//import apis
const userApi=require('./API/users')

//execute specific api based on path
app.use("/users",userApi)


//mongodb connection
const dbURl="mongodb+srv://charan:Charan%40662@menu.acguq.mongodb.net/AssesmentDB?retryWrites=true&w=majority";

mc.connect(dbURl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err){
        console.log('Error in connecting to the Database')
    }
    else{
        let databaseObj=client.db('AssesmentDB')

        let UsersCollectionObj=databaseObj.collection('users')

        app.set("UsersCollectionObj",UsersCollectionObj)
        console.log("connected to the database....")
    }
})
app.use(exp.json());

//assigning the port number
app.listen(2000,()=>{
    console.log("Server started on port 2000....")
})