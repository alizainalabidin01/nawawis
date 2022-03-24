import dbConnect from "../../../utils/mongo";
import Order from "../../../models/order";

export default async function handler(req, res) {
  const { method, cookies } = req;

  const token = cookies.token

   dbConnect();

  if (method === "GET") {
    try {
      const order = await Order.find();
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    // if(!token || token !== process.env.token){
    //   return res.status(401).json("Not authenticated!")
    // }
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
}