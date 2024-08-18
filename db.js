const mongoose=require('mongoose')
const mongoURL="mongodb://127.0.0.1:27017/hotels"


mongoose.connect(mongoURL,{
    'useNewUrlParser':true,
    'useUnifiedTopology':true

})

const db=mongoose.connection;

db.on('error',(err)=>{
    console.error('Error in connecting to database: ',err)
});

db.on('connected',()=>{
    console.log('connected to database')
});

db.on('disconnected',()=>{
    console.log('disconnected to database')
});


module.exports=db;