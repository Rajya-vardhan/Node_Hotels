const express=require('express')
const router=express.Router()
const MenuItem=require('./../models/MenuItem')

router.post('/',async (req,res)=>{
    try{
    const data=req.body
    const newItem=new MenuItem(data)
    const ItemSaved=await newItem.save()
    console.log('item saved')
    res.status(200).send(ItemSaved)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'internal server error'})

    }
})

router.get('/',async (req,res)=>{
    try{
        const item=await MenuItem.find()
        console.log('item read')
        res.status(200).json(item)

    }catch(err){
        console.log(err)
        res.status(500).json({error:'internal server error'})

    }
})

router.get('/:tasteType',async (req,res)=>{
    try{
        const tasteType=req.params.tasteType;
        if(tasteType=="sweet"||tasteType=="sour"|| tasteType=="spicy"){
            const data= await MenuItem.find({taste:[tasteType]});
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


router.put('/:MenuItemId',async (req,res)=>{
    try{
    const id=req.params.MenuItemId;
    const Updatedata=req.body;

    const response=await MenuItem.findByIdAndUpdate(id,Updatedata,{
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


router.delete('/:MenuItemid',async (req,res)=>{
    try{
        const id=req.params.MenuItemid;


        const response= await MenuItem.findByIdAndDelete(id)
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
