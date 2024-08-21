const mongoose=require('mongoose')
const bcrypt = require('bcrypt')

const personSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        age:{type:Number,required:true},
        work:{type:String,enum:['chef','waiter','manager'],required:true},
        address:{type:String},
        salary:{type:Number,required:true},
        email:{type:String,required:true,unique:true},
        mobile:{type:Number,required:true},
        username:{type:String,required:true},
        password:{type:String,required:true}
    }
)

personSchema.pre('save',async function(next){
    const person=this;
    if(!person.isModified('password')){
        
        return next();
    }
    try{
        
        const salt=await bcrypt.genSalt(10)
        const hashedpass=await bcrypt.hash(person.password,salt)
        person.password=hashedpass
        next()

    }catch(err){
        console.log(err)
        return next(err)

    }
})

personSchema.methods.comparePass=async function(pass){
    try{
        const ismatch=bcrypt.compare(pass,this.password)
        return ismatch
    }catch(err){
        throw err
    }
}

const Person=mongoose.model('Person',personSchema);


module.exports=Person;

// next(err) done(err)
// if none we do throw err 