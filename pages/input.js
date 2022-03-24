import { useState } from "react";

import axios from "axios";
import { useRouter } from "next/router";

const Add = () => {
  const [img, setImg] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [name_product, setNameProduct] = useState(null);
  const [type, setType] = useState(null);
  const [desc, setDesc] = useState(null);
  const [price, setPrices] = useState([]);
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
    data.append("file", img);
    data.append("upload_preset", "nawawis");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dbofxpqui/image/upload", 
        data
      );

      const { url } = uploadRes.data;
      setImgUrl( arr => [...arr, url])
      alert(imgUrl)
      console.log(imgUrl);
    } catch (err) {
      console.log(err);
    }
  }

  const handleCreate = async () => {
      const newProduct = {
        name_product,
        desc,
        price,
        type,
        // extraCategory,
        img: imgUrl,
      };

      await axios.post("http://localhost:3000/api/product", newProduct);
      setImg(''),
      setImgUrl(''),
      setDesc(''),
      setNameProduct(''),
      setPrices(''),
      setType('')
   
  };

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
        <button  onClick={handleCreate} className="bg-[#46391e] px-1 py-1 text-white  hover:bg-[#f5eddc] hover:text-black">
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;