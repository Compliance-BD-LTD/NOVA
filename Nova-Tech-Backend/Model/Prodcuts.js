const mongoose=require('mongoose')

const Schema=mongoose.Schema

const ProductSchema=Schema({
    model:String,
    name:String,
    category:String,
    releaseDate:Date,
    rating:Number,
    description:String,
    imageUrl:[String],
    techSpec:[{
        type: Map,
        of:String
    }],
    pdf:String
},
{
    timestamps:true
}
)

const Products=mongoose.model('products',ProductSchema)

module.exports={
    Products
}