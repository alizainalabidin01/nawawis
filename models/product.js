import mongoose from "mongoose";

const productschema = new mongoose.Schema ({

    name_product:{
        type: String,
        required: true,
        maxlength: 200
    },
    img:{
        type: [String],
        required: true,
        maxlength:200
    },
    desc:{
        type: String, 
        required: true,
        maxlength:1500 
    },
    price:{
        type: [Number],
        required: true,
        maxlength:200 
    },
    sold:{
        type: Number,
        default: 0
    },
    stock:{
        type: Number,
        default: 0
    },
    type:{
        type: String, 
        required: true,
        maxlength:200 
    }
   

},{timestamps: true}
)

// var room_model = mongoose.model('room', productschema);
// room_model.find({},function(mst,msg){
//                 var id = msg.length
//                 var room = new room_model({
//                     id:id
//                 })
//                 room.save();
//             })

module.exports = mongoose.models.product || mongoose.model('product', productschema);