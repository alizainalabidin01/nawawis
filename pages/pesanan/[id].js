import MainLayout from "../../components/layout";
import Link from "next/link"
import axios from "axios";
import {useState}  from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
SwiperCore.use([Autoplay, Pagination, Navigation]);
import dbConnect from "../../utils/mongo";
// import products from "../../models/product";
// import order from "../../models/order";

export const getStaticProps = async ({params}) => {
  await dbConnect();
  const res = await axios.get(`http://localhost:3000/api/product/id/${params.id}`)
 
  return {
    props : {
      dataid : res.data,
   
    }
  };

}




function Details ({dataid}) {
  const [total, setTotal] = useState(Number);
  const [size, setSize] = useState('');
  const [name_customer, setNameCustomer] = useState('');
  const [addres, setAddres] = useState('');
  const [note, setNote] = useState('');
  const id_product = dataid._id
  const name_product = dataid.name_product
  const product_img = dataid.img[0]
  const handlePay = async () => {
      
    const newOrder = {
      name_customer,
      total,
      size,
      addres,
      id_product,
      note,
      name_product,
      product_img
    };

    await axios.post("http://localhost:3000/api/order", newOrder);
    alert("data berhasil dimasukan")
};
    return(
        <MainLayout>
        <section className="py-3">
        <div className="flex flex-row w-full ">
        
        <div className="h-30 md:h-96 w-6/12 gap-2 mx-6 ">
        <Swiper spaceBetween={30}
      centeredSlides={true} autoplay={{
        "delay": 2500,
        "disableOnInteraction": false
      }} pagination={{
        "clickable": true
      }} loop={true} className=" h-full">
      {dataid.img.map((slide) => (
        <SwiperSlide key={slide}>
            <img className="object-contain h-full mx-auto" src={slide} />
        </SwiperSlide>
      ))}
    </Swiper>
        </div>
        <div className="h-30 md:relative md:h-96 text-xs md:font-['serif'] mr-2 w-6/12">
        <div className="flex flex-col md:flex-row w-full">
        <div className='flex w-1/6'><span> Product:</span> </div><div className="flex w-full md:text-right md:justify-end">{dataid.name_product}</div>
        </div>
        <div className="flex flex-col md:flex-row w-full py-5">
        <div className='flex w-1/6 '><span> Description:</span> </div><div className="flex w-full md:text-right md:justify-end">{dataid.desc}</div>
        </div>
        <div className="flex flex-row w-full py-5">
        <div className='flex w-1/6 '><span> Size:</span> </div><div className="flex w-full text-right justify-end">

                  <button className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-1 py-1 text-xs md:px-3 md:py-2 rounded-md md:text-sm font-medium" onClick={() => setTotal(dataid.price[0]) + setSize("M")}> M</button>
                  <button className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-1 py-1 text-xs md:px-3 md:py-2 rounded-md md:text-sm font-medium"  onClick={() => setTotal(dataid.price[1]) + setSize("L")}>L</button>
                  <button  className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-1 py-1 text-xs md:px-3 md:py-2 rounded-md md:text-sm font-medium" onClick={() => setTotal(dataid.price[2]) + setSize("XL")}>XL</button>
        </div>
        </div>
        <p  onChange={() => setSize({size})}>{size}</p>
        <div className=" py-2">
        <label >name : </label>
          <input
           className="border-2"
            type="text"
            onChange={(e) => setNameCustomer(e.target.value)}
          />
        </div>
        <div className=" py-2">
        <label >addres : </label>
          <input
           className="border-2"
            type="text"
            onChange={(e) => setAddres(e.target.value)}
          />
        </div>
        <div className=" py-2">
        <label >note : </label>
          <input
           className="border-2"
            type="text"
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        
        {/* <Link href={'/pembayaran/' + dataid._id} key={dataid._id}><a> */}
        <div onClick={handlePay} className="bg-[#f5eddc] flex flex-row w-full mx-auto p-2 my-2 rounded-xl text-sm sm:text-base justify-center md:absolute md:inset-x-0 bottom-0"><p  onChange={() => setTotal({total})}> {"Rp."+total.toLocaleString()}</p></div>
        {/* </a></Link> */}
        </div>
        
        </div>
        
        </section>
       
        </MainLayout>
    );
}


export default Details