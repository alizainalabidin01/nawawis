import dbConnect from "../../utils/dbConnnect";

await dbConnect();

export default async (req,res)=>{
    res.json({test: 'test'})
}