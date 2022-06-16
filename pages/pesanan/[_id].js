import MainLayout from "../../components/layout";
import Link from "next/link"
import axios from "axios";
import {useState, useEffect}  from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
SwiperCore.use([Autoplay, Pagination, Navigation]);
import dbConnect from "../../utils/mongo";
import products from "../../models/product";
import order from "../../models/order";
import bodyParser from "body-parser";
import { promisify } from "util";

const getBody = promisify(bodyParser.urlencoded());

export const getServerSideProps = async ({params, req, res}) => {
  await dbConnect();
  const _id = params
  const data = await products.findById(_id);
  const id_product =   data._id
  // const price =  await  products.collectiont.find( {_id:_id, price: { $gt: 1 } } )
  // console.log(price);
  const name_product =  JSON.parse(JSON.stringify(data.name_product))
  const product_img =  JSON.parse(JSON.stringify(data.img[0]))
  if (req.method === "POST" ) {
    await getBody(req, res);
    // const [newOrder, setNewOrder] = useState([]);
    
    const name_customer =  req.body.name_customer
    const total =  req.body.total
    const size =  req.body.size
    const addres =  req.body.addres
    const note =  req.body.note
    const newOrder = ({
    total,
    name_customer,
    size,
    addres,
    id_product,
    note,
    name_product,
    product_img
  })
    console.log(newOrder);
    await order.create(newOrder);
    // alert("Pemesanan Berhasil")
    
  }
  // if (req.method === "POST") {
  //  await order.create(req, res);
  // }

  return {
    props : {
      dataid: JSON.parse(JSON.stringify(data)),
      // dataprice: JSON.parse(JSON.stringify(price)),
   
    }
  };

}


function Details ({dataid, props}) {
  const [total, setTotal] = useState('');
  // const [total1, setTotal1] = useState(Number);
  const [size, setSize] = useState('');
  // const [name_customer, setNameCustomer] = useState('');
  // const [addres, setAddres] = useState('');
  // const [note, setNote] = useState('');
  const [newOrder, setNewOrder] = useState([]);
  // const id_product = dataid._id
  // const name_product = dataid.name_product
  // const product_img = dataid.img[0]
  props=newOrder
  // useEffect(() => {
    
  //   order.create(orderan)
  // }, [])
  // const handlePay = async () => {
      
  //    setNewOrder(
  //     name_customer,
  //     total,
  //     size,
  //     addres,
  //     id_product,
  //     note,
  //     name_product,
  //     product_img
  //   )
    
    // await order.create(newOrder)
    // await axios.post("http://localhost:3000/api/order", newOrder);
    
// };
    return(
        <MainLayout>
        <section className="py-3">
        <div className="flex flex-row w-full md:mb-10">
        
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
        <div className='flex w-1/6 '><span> Description:</span> </div><div className="flex w-full md:text-right md:justify-end"><p>{dataid.desc.replace(/\\n/g, '\n')}</p></div>
        </div>
        <div className="flex flex-row w-full py-5">
        <div className='flex w-1/6 '><span> Size: {size} </span> </div>
        <div className="flex w-full text-right justify-end">
        <button className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-1 py-1 text-xs md:px-3 md:py-2 rounded-md md:text-sm font-medium" onClick={() => setTotal(dataid.price[0]) + setSize("M")}> M</button>
        <button className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-1 py-1 text-xs md:px-3 md:py-2 rounded-md md:text-sm font-medium"  onClick={() => setTotal(dataid.price[1]) + setSize("L")}>L</button>
        <button  className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-1 py-1 text-xs md:px-3 md:py-2 rounded-md md:text-sm font-medium" onClick={() => setTotal(dataid.price[2]) + setSize("XL")}>XL</button>
       
        </div>
        </div>
        <div>
        <form className=" w-full" method="POST">
        {/* <p>{size}</p> */}
        <div className=" py-2">
        <label >Name : </label>
          <input
           className="border-2"
            type="text"
            name="name_customer"
           defaultValue={props.name_customer}
           required
          />
          <input  name="total" onChange={() => setTotal({total})} defaultValue={props.total = total} type="text" readOnly="readonly" required/>
          
        </div>
        <div className="md:py-0 py-2">
        <label >Addres : </label>
          <input
           className="border-2"
            type="text"
            name="addres"
           defaultValue={props.addres}
           required
          /><input  name="size" defaultValue={(props.size = size)} type="text"  readOnly="readonly" placeholder={size} required />
        </div>
        <div className=" py-2">
        <label >Note : </label>
          <input
           className="border-2"
            type="text"
            name="note"
           defaultValue={props.note}
           required
          />
        </div>
        
        {/* <Link href={'/pembayaran/' + dataid._id} key={dataid._id}><a> */}
       
        <div className="bg-[#f5eddc] flex  w-full mx-auto p-2 my-2 rounded-xl text-sm sm:text-base justify-center md:absolute md:inset-x-0 "><button type="submit"  onChange={() => setTotal({total})}> {"Rp."+total.toLocaleString()}</button></div>
        </form></div>
        {/* </a></Link> */}
        </div>
        
        </div>
        
        </section>
       
        </MainLayout>
    );
}


export default Details