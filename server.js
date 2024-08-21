
// console.log("server is running");

// (function() {
//     console.log("welcome");
// })();

// var _=require('lodash');
// var fs=require('fs');
// var os=require('os');
// var prompt=require('prompt-sync')();


// console.log("server is running");
// function add(a,b){
//     return a+b;
// }

// var res=add(2,7);
// console.log(res);



// function add(a,b){
//     return a+b;
// }

// var add=function(a,b){
//     return a+b;
// }
// function callback(){
//     console.log("callback function");
// }
// var add=(a,b)=>{
//     return a+b;
// }

// var add=(a,b,callback)=>{
//     console.log(a+b)
//     callback();}
// var c=add(2,3)

// console.log("answer: "+c)
// add(2,3,callback)
// add(2,3,()=>console.log("hi"));
// add(2,3,function(){
//     console.log("hi");
// })



// var fs=require('fs');
// var os=require('os');
// var user=os.userInfo();
// console.log(user.username);

// fs.appendFile("greetings.text","hi "+ user.username + "!\n",()=>console.log("greetings sent"));

// console.log(fs)



// var notes=require('./notes.js')
// var age=notes.age
// console.log("age: "+age)
// var add=notes.add;
// console.log("sum: "+ add(3,4));

// const _=require('lodash')
// var list=['raj','raj','tan','tan',1,2,1,1,5,5,6,5,6,7,7];
// var res=_.uniq(list)
// console.log(res)
// console.log(_.isString('true'))



// var json='{"cars":["saab","volvo","benz"],"price":[100,2000,3000]}'
// var obj=JSON.parse(json)
// console.log(typeof obj)

// var obj2={cars: [ 'saab', 'volvo', 'benz' ],
//      price: [ 100, 2000, 3000 ]

// }
// var json2=JSON.stringify(obj2)
// console.log(typeof json2)




const express=require('express');
const app=express();
const db=require('./db');
const bodyParser=require('body-parser')
const PersonRoutes=require('./Routes/PersonRoutes')
const MenuItemRoutes=require('./Routes/MenuItemRoutes')
require('dotenv').config()
const Passport=require('./auth');
const passport = require('./auth');
app.use(bodyParser.json())


// logging middle-ware 
const logReq=(req,res,next)=>{
    console.log('[ ', new Date().toLocaleString(),' ] ' , ' req node to:', ' [ ', req.originalUrl,' ] ')
    next()
}

app.use(passport.initialize())
const localAuthMiddleware=passport.authenticate('local',{session:false})

app.get('/',logReq,function(req,res){
    res.send('Welcome to my restaurant');
})

app.use('/person',localAuthMiddleware,logReq,PersonRoutes)
app.use('/item',logReq,MenuItemRoutes)





const PORT=process.env.PORT || 3000;
app.listen(3000,()=>console.log('server is live '))