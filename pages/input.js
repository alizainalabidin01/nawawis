import { useState } from "react";
import axios from "axios";
import dbConnect from "../utils/mongo";
import bodyParser from "body-parser";
import { promisify } from "util";
import products from "../models/product";


const getBody = promisify(bodyParser.urlencoded());

export const getServerSideProps = async ({ req, res}) => {
  await dbConnect();

  if (req.method === "POST") {
   await getBody(req, res);
   const img1 = req.body.imgUrl
   const img2 = req.body.imgUrl1
   const desc = req.body.desc
   const price0 = req.body.price0
   const price1 = req.body.price1
   const price2 = req.body.price2
   console.log(img1);
   const type = req.body.type
   const name_product = req.body.name_product
   const newProduct = ({
            img:[img1,img2],
            desc,
            price:[price0,price1,price2],
            type,
            name_product
          })
   await products.create( newProduct)
    
  }
    return {
      props : {
      
      }
    };

}

function Add ({props}){
  const [img, setImg] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [name_product, setNameProduct] = useState(null);
  const [type, setType] = useState(null);
  const [desc, setDesc] = useState(null);
  const [price, setPrices] = useState([]);
  const [new1, setNew] = useState([]);
  props=new1
  // const [extraCategory, setExtraCategory] = useState([]);
  // const [extra, setExtra] = useState(null);

  const changePrice = (e, index) => {
    const currentPrices = price;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  // const handleExtraInput = (e) => {
  //   setExtra({ ...extra, [e.target.name]: e.target.value });
  // };

  // const handleExtra = (e) => {
  //   setExtraCategory((prev) => [...prev, extra]);
  // };
  
  const handleImage = async () => {
    const data = new FormData();
    console.log("..............."+img);
    data.append("file", img);
    data.append("upload_preset", "nawawisProduct");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dbofxpqui/image/upload", 
        data
      );

      const { url } = uploadRes.data;
      setImgUrl( arr => [...arr, url])
      alert("gambar berhasil dimasukan")
    } catch (err) {
      console.log(err);
    }
  }

  // const handleCreate = async () => {
  //     const newProduct = {
  //       name_product,
  //       desc,
  //       price,
  //       type,
  //       // extraCategory,
  //       img: imgUrl,
  //     };

  //     await axios.post("http://localhost:3000/api", newProduct);
  //     setImg(''),
  //     setImgUrl(''),
  //     setDesc(''),
  //     setNameProduct(''),
  //     setPrices(''),
  //     setType('')
  //     alert("data berhasil dimasukan")
  // };

  return (
    <div >
      <div >
       
        <h1>Add a new Product</h1>
        <div className="px-3 py-3">
          <label >Choose an image </label><br></br>
          <input type="file" onChange={(e) => setImg(e.target.files[0])} />
        </div>
        <button  onClick={handleImage} className="bg-[#46391e] px-1 py-1 text-white  hover:bg-[#f5eddc] hover:text-black">
          Create
        </button>
        <div  className="px-3 py-3">
          <label >product : </label>
          <input
           className="border-2"
            type="text"
            onChange={(e) => setNameProduct(e.target.value)}
          />
        </div>
        <div className="px-3 py-3">
          <label>Description :</label>
          <textarea
          className="border-2"
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="px-3 py-3">
          <label >Prices :</label>
          <div className="px-3 py-3">
            <input
            className="border-2"
              type="number"
              placeholder="M"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
           className="border-2"
              type="number"
              placeholder="L"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
           className="border-2"
              type="number"
              placeholder="XL"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className="px-3 py-3">
          <label>type</label>
          <input
           className="border-2"
           type="text"
           onChange={(e) => setType(e.target.value)}
         />
          
          {/* <div >
            <input
           
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
             
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button  onClick={handleExtra}>
              Add
            </button>
          </div> */}
          {/* <div >
            {extraCategory.map((option) => (
              <span key={option.text} >
                {option.text}
              </span>
            ))}
          </div> */}
        </div>
        <form method="POST" >

        <button  type="submit" className="bg-[#46391e] px-1 py-1 text-white  hover:bg-[#f5eddc] hover:text-black">
          Create
        </button>
        <input className="opacity-0" name="name_product" defaultValue={props.name_product = name_product}  readOnly="readonly"/>
        <input className="opacity-0" name="desc" defaultValue={props.desc = desc}  readOnly="readonly"/>
        <input className="opacity-0" name="price0" defaultValue={props.price0 = price[0]}  readOnly="readonly"/>
        <input className="opacity-0" name="price1" defaultValue={props.price1 = price[1]}  readOnly="readonly"/>
        <input className="opacity-0" name="price2" defaultValue={props.price2 = price[2]}  readOnly="readonly"/>
        <input className="opacity-0" name="type" defaultValue={props.type = type}  readOnly="readonly"/>
        <input className="opacity-0" name="imgUrl" defaultValue={props.imgUrl = imgUrl[0]}  readOnly="readonly"/>
        <input className="opacity-0" name="imgUrl1" defaultValue={props.imgUrl1 = imgUrl[1]}  readOnly="readonly"/>
        </form>
      </div>
    </div>
  );
};

export default Add;