const express=require('express')
const router=express.Router()
const Person=require('./../models/Person')
const {jwtAuthMiddleware,genToken}=require('./../jwt')
router.post('/Signup',async (req,res)=>{
    try{
       const data=req.body;
       const newPerson=new Person(data)
       const SavedPerson= await newPerson.save()
       console.log('data saved')
       const payload={
        id:SavedPerson.id,
        username:SavedPerson.username
       }
       const token=genToken(payload)
       console.log("token is: ",token)
       res.status(200).send({
        response:SavedPerson,
        token:token
       })
    }catch(err){
       console.log(err)
       res.status(500).json({error:'internal server error'})
    }
})

router.post('/Login', async (req,res)=>{
    try{
        const {username,password}=req.body;
        const user=await Person.findOne({username:username});
        if(!user || !(await user.comparePass(password))){
            return res.status(401).json({error:'User not found'});
        }
        const payload={
            id:user.id,
            username:user.username
           }
           const token=genToken(payload)
           console.log("token is: ",token)
           res.status(200).send({
            
            token:token
           })


    }catch(err){
        console.log(err)
       res.status(500).json({error:'internal server error'})

    }
})


router.get('/profile',jwtAuthMiddleware,async (req,res)=>{
    try{
    
    const data=req.user;
    const id=data.userData.id;
    
    const user= await Person.findById(id)
    res.status(200).json(user)}
    catch(err){
        console.log(err)
       res.status(500).json({error:'internal server error'})
    }
})
router.get('/',jwtAuthMiddleware,async (req,res)=>{
   try{
       const person=await Person.find()
       console.log('data read')
       res.status(200).json(person)
   }catch(err){
       console.log(err)
       res.status(500).json({error:'internal server error'})
    }


   
})


router.get('/:workType',jwtAuthMiddleware,async (req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType=="chef"||workType=="waiter"|| workType=="manager"){
            const data= await Person.find({work:workType});
            console.log("Data fetched")
            res.status(200).json(data)


        }
        else{
            res.status(400).json({error:'invalid work type'})
        }

    }catch(err){
       console.log(err)
       res.status(500).json({error:'internal server error'})
    }
})

// scipt for delete and update
router.put('/:personId',jwtAuthMiddleware,async (req,res)=>{
    try{
    const id=req.params.personId;
    const Updatedata=req.body;

    const response=await Person.findByIdAndUpdate(id,Updatedata,{
        new:true,
        runValidators:true
    })
    if(!response){
        res.status(404).json({error:'person not found'})
    }
    console.log('Data updated')
    res.status(200).json(response)
}catch(err){
    console.log(err)
       res.status(500).json({error:'internal server error'})
}

})


router.delete('/:personid',jwtAuthMiddleware,async (req,res)=>{
    try{
        const id=req.params.personid;


        const response= await Person.findByIdAndDelete(id)
        if(!response){
            res.status(404).json({error:'person not found'})  
        }
        console.log('Data deleted')
    res.status(200).json(response)
    }catch(err){
        console.log(err)
           res.status(500).json({error:'internal server error'})
    
    }
})

module.exports=router
