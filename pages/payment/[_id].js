import MainLayout from "../../components/layout";
import Link from "next/link"
import axios from "axios";
import {useState}  from "react";
import dbConnect from "../../utils/mongo";
// import products from "../../models/product";
import order from "../../models/order";
import bodyParser from "body-parser";
import { promisify } from "util";
// import FormData from 'form-data';
// import fs from 'fs'

const getBody = promisify(bodyParser.urlencoded());

export const getServerSideProps = async ({params, req, res}) => {
  await dbConnect();
  const _id = params
  const data = await order.findById(_id);
  const id = data._id
  if (req.method === "POST") {
   await getBody(req, res);
   const statuss = "pembayaran sedang di verivikasi"
   const imgurl = req.body.url
   const pay = ({
            imgPay: imgurl,
            statuss
          })
 console.log(params);
   await order.update({"_id":`${id}`},{$set: pay})
  //  const img = fs.createReadStream(file[0]);
  //  console.log("......................................................."+img);
  //   const data = new FormData();
  //   data.append("file", img);
  //   data.append("upload_preset", "nawawis");
  //   try{
  //     // const uploadRes = await axios.post(
  //     //   "https://api.cloudinary.com/v1_1/dbofxpqui/image/upload", 
  //     //   data
  //     // );
  //     const uploadRes = await fetch('https://api.cloudinary.com/v1_1/dbofxpqui/image/upload', {
  //     method: 'POST',
  //     body: data
  //   }).then(r => r.json());
      
  //     const url  = uploadRes.secure_url;
  //       console.log("url"+url);
  //       const pay = ({
  //         imgPay: url,
  //         statuss
  //       })
  //       console.log(pay);
  
  //    await order.update(`${params}`,{$set: pay})

  //     }catch (err) {
  //       console.log(err);
  //     }
     
   
    
  }
    return {
      props : {
        dataorder: JSON.parse(JSON.stringify(data)),
      
      }
    };

}

// export const test = async ({imgPay}) =>{
//   const imgUrl =''
// alert(imgPay)
  
//   const statuss = "pembayaran sedang di verivikasi"

//   // const data = new FormData();
//   // data.append("file", imgPay);
//   // data.append("upload_preset", "nawawis");
 
//   //   const uploadRes = await axios.post(
//   //     "https://api.cloudinary.com/v1_1/dbofxpqui/image/upload", 
//   //     data
//   //   );
    
//   //   const { url } = uploadRes.data;
//   //   imgUrl = url
//   //   console.log(imgUrl);
//   //   alert("berhasil")
  
   
//  const newOrder = ({
 
//   statuss

// });

// return{
//   props:newOrder
// }
// // await order.update({"_id":`${dataorder._id}`},{$set: newOrder})
// // await axios.put(`http://localhost:3000/api/order/id/${dataorder._id}`, newOrder);
// // alert("data berhasil dimasukan")

// }

function Details ({dataorder, props}) {
  const [img, setImg] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [newOrder, setNewOrder] = useState([]);
  props=newOrder
  
  const handlePay = async () => {
    const data = new FormData();
    console.log("..............."+img);
    data.append("file", img);
    data.append("upload_preset", "nawawis");
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
    return(
        <MainLayout>
        <section className="pt-3">
        <div className="flex flex-row w-full ">
        
        <div className="h-30 md:h-96 w-6/12 gap-2 mx-6 ">
        <img className="object-contain h-full mx-auto" src={dataorder.product_img[0]} />
        </div>
        <div className="h-30 md:relative md:h-96 text-xs md:font-['serif'] pr-3 w-6/12">
        <div className="flex flex-col md:flex-row w-full">
        <div className='flex w-1/6'><span> Product:</span> </div><div className="flex w-full md:text-right md:justify-end">{dataorder.name_product}</div>
        </div>
        <div className="flex flex-col md:flex-row w-full py-5">
        <div className='flex w-1/6 '><span> Note:</span> </div><div className="flex w-full md:text-right md:justify-end">{dataorder.note}</div>
        </div>
        <div className="flex flex-row w-full py-5">
        <div className='flex w-1/6 '><span> Size : </span> <p>{dataorder.size}</p> </div>
        </div>
        <div className="flex flex-col md:flex-row w-full py-5">
        <div className='flex w-1/6 '><span> Addres:</span> </div><div className="flex w-full md:text-right md:justify-end">{dataorder.addres}</div>
        </div>
        <div className="flex flex-col md:flex-row w-full py-5">
        <div className='flex w-1/6 '><span> Customer:</span> </div><div className="flex w-full md:text-right md:justify-end">{dataorder.name_customer}</div>
        </div>
        
        <div className=" py-3">
          <label >Choose an image </label><br></br>
          <input className="w-full"  type="file" onChange={(e) => setImg(e.target.files[0])} />
          <button onClick={handlePay}  className="bg-[#52411e] mt-1 px-1 py-1 text-white"> Upload bukti pembayaran</button>
        </div>
        
        <form method="POST" name="imgPay">
        <input className="opacity-0" name="url" defaultValue={props.url = imgUrl}  readOnly="readonly"/>
        <div  className="bg-[#f5eddc] flex flex-row w-full mx-auto p-2 my-2 rounded-xl text-sm sm:text-base justify-center md:absolute md:inset-x-0 bottom-0"><button > verivikasi pembayaran</button></div>
        </form>
        </div>
        
        </div>
        
        <div className="bg-fuchsia-100 p-6 mt-3 font-normal text-xs">
        <h2 className="font-semibold mb-2">Metode Pembayaran</h2>
        <p>CIMB NIAGA : 706926281100  A/N TUTUT IRYANA DEVI</p>
        <p>BRI : 614301019224536  A/N TUTUT IRYANA DEVI </p>
        <p>BTPN : 90200194182  A/N TUTUT IRYANA DEVI </p> 
        <p>DANA : 081354181920  A/N TUTUT IRYANA DEVI </p>
        <p>SHOPEEPAY : 088989319606  A/N nawawi's.boutique </p> <br/>
        <p>Note: Harap pastikan nomor dan nama penerima sesuai dengan yang tertera diatas.</p>
        </div>
        
        </section>
        
        </MainLayout>
    );
}


export default Details