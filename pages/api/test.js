import dbConnect from "../../utils/dbConnnect";

dbConnect();

export default async (req,res)=>{
    res.json({test: 'test'})
}