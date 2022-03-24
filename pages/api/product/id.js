import dbConnect from "../../../utils/mongo";
import Product from "../../../models/product";

export default async function handler(req, res) {
  const { method, 
    query
    ,cookies } = req;
    var pipeline = [
        {$sort :{"sold":-1 }}
    ]
  const token = cookies.token

  await dbConnect();

  if (method === "GET") {
    try {
      const product = await Product.find({"_id":"622b44903476a5f0501c9644"})
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    // if(!token || token !== process.env.token){
    //   return res.status(401).json("Not authenticated!")
    // }
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}