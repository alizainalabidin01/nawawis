import MainLayout from "../../components/layout";
import Link from "next/link"
import axios from "axios";
import {useState}  from "react";
import dbConnect from "../../utils/mongo";
import products from "../../models/product";
import order from "../../models/order";

export const getServerSideProps = async ({params}) => {
  await dbConnect();
    const res = await axios.get(`http://localhost:3000/api/order/id/${params.id}`)
    // const best = await  sql_query('SELECT * FROM kriyathor2 ORDER BY sold_produk DESC LIMIT 6')
    // let databest = JSON.parse(JSON.stringify(best))
    return {
      props : {
        dataorder : res.data,
      
      }
    };

}



function Details ({dataorder}) {
    const [imgUrl, setImgUrl] = useState([]);
    const [product_img, setImg] = useState([]);
    const status = "pembayaran sedang di verivikasi"
    const imgPay = ""
   
    const handlePay = async () => {
        const data = new FormData();
        data.append("file", product_img);
        data.append("upload_preset", "nawawis");
        try {
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dbofxpqui/image/upload", 
            data
          );
          const { url } = uploadRes.data;
          console.log(dataorder._id);
          setImgUrl(url)
        } catch (err) {
            console.log(err);
          }
    
         
      const newOrder = {
        imgPay : imgUrl,
        status

      };
  
      await axios.put(`http://localhost:3000/api/order/id/${dataorder._id}`, newOrder);
      alert("data berhasil dimasukan")
  };
    return(
        <MainLayout>
        <section className="py-3">
        <div className="flex flex-row w-full ">
        
        <div className="h-30 md:h-96 w-6/12 gap-2 mx-6 ">
        <img className="object-contain h-full mx-auto" src={dataorder.product_img} />
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
        </div>
        
      
        <div onClick={handlePay} className="bg-[#f5eddc] flex flex-row w-full mx-auto p-2 my-2 rounded-xl text-sm sm:text-base justify-center md:absolute md:inset-x-0 bottom-0"><p> {"upload bukti pembayaran"}</p></div>
        </div>
        
        </div>
        
        </section>
        
        </MainLayout>
    );
}


export default Details