const mongoose=require('mongoose')


const ItemSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        price:{type:Number,required:true},
        taste:{type:String,enum:["sweet","spicy","sour"]},
        isDrink:{type:Boolean,default:false},
        ingredients:{type:[String],default:[]},
        num_sales:{type:Number,default:0}
    }
)

const MenuItem=mongoose.model('Menu Item',ItemSchema)

module.exports=MenuItem