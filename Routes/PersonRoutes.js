const express=require('express')
const router=express.Router()
const Person=require('./../models/Person')

router.post('/',async (req,res)=>{
    try{
       const data=req.body;
       const newPerson=new Person(data)
       const SavedPerson= await newPerson.save()
       console.log('data saved')
       res.status(200).send(SavedPerson)
    }catch(err){
       console.log(err)
       res.status(500).json({error:'internal server error'})
    }
})

router.get('/',async (req,res)=>{
   try{
       const person=await Person.find()
       console.log('data read')
       res.status(200).json(person)
   }catch(err){
       console.log(err)
       res.status(500).json({error:'internal server error'})
    }


   
})


router.get('/:workType',async (req,res)=>{
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


router.put('/:personId',async (req,res)=>{
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


router.delete('/:personid',async (req,res)=>{
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
