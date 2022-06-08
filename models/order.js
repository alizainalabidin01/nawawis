import mongoose from "mongoose";

const orderschema = new mongoose.Schema ({

    id_product:{
        type: String,
        required: true,
    },
    name_customer:{
        type: String,
        required: true,
        maxlength: 200
    },
    name_product:{
        type: String,
        required: true,
        maxlength: 200
    },
    product_img:{
        type: [String],
        maxlength:200
    },
    addres:{
        type: String,
        required: true,
        maxlength: 200
    },
    note:{
        type: String,
        required: true,
        maxlength: 200
    },
    size:{
        type: String,
        required: true,
        maxlength: 200
    },
    imgPay:{
        type: [String],
        maxlength:200
    },
    total:{
        type: Number,
        required: true,
        maxlength: 200
    },
    statuss:{
        type: String,
        default: "Belum Dibayarkan"
    },
    method:{
        type: Number,
        
    },

 
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

module.exports = mongoose.models.order || mongoose.model('order', orderschema);