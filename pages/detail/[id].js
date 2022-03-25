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
  const type = res.data.type
  console.log(type);
  const type1 = await axios.get(`http://localhost:3000/api/product/${type}`)
  return {
    props : {
      dataid : res.data,
      datatype : type1.data
    }
  };

}



function Details ({dataid, datatype}) {
  const [price, setPrice] = useState(Number);
  const [size, setSize] = useState('');
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
        <div className="h-30 md:relative md:h-96 text-xs md:font-['serif'] pr-3 w-6/12">
        <div className="flex flex-col md:flex-row w-full">
        <div className='flex w-1/6'><span> Product:</span> </div><div className="flex w-full md:text-right md:justify-end">{dataid.name_product}</div>
        </div>
        <div className="flex flex-row w-full">
        <div className="flex py-5 w-3/6"> Like :</div>
        <div className="flex gap-0 w-3/6 py-5  justify-end">
        <p>{dataid.like}</p>
        </div></div>
        <div> <span >Sold :</span> <span className="float-right"> {dataid.sold}</span><br/></div>
        <div className="flex flex-col md:flex-row w-full py-5">
        <div className='flex w-1/6 '><span> Description:</span> </div><div className="flex w-full md:text-right md:justify-end">{dataid.desc}</div>
        </div>
        <div className="flex flex-row w-full py-5">
        <div className='flex w-1/6 '><span> Size:</span> </div><div className="flex w-full text-right justify-end">

                  <button className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-1 py-1 text-xs md:px-3 md:py-2 rounded-md md:text-sm font-medium" onClick={() => setPrice(dataid.price[0]) + setSize("M")}> M</button>
                  <button className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-1 py-1 text-xs md:px-3 md:py-2 rounded-md md:text-sm font-medium"  onClick={() => setPrice(dataid.price[1]) + setSize("L")}>L</button>
                  <button  className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-1 py-1 text-xs md:px-3 md:py-2 rounded-md md:text-sm font-medium" onClick={() => setPrice(dataid.price[2]) + setSize("XL")}>XL</button>
        </div>
        </div>
        <p>{size}</p>
        <Link href={'/pesanan/' + dataid._id} key={dataid._id}><a>
        <div className="bg-[#f5eddc] flex flex-row w-full mx-auto p-2 my-2 rounded-xl text-sm sm:text-base justify-center md:absolute md:inset-x-0 bottom-0"><p> Order</p></div>
        </a></Link>
        </div>
        
        </div>
        
        </section>
        <section className="shadow-md px-2">
        <h6 className="my-5 mx-6 sm:text-2xl font-['serif']">Similar Product</h6>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 justify-center">
          {datatype.map(item=>
            <Link href={'/detail/' +item._id} key={item._id}><a>
              <div className="flex flex-col gap-2 p-1 my-1 font-['sans-serif'] text-xs bg-white hover:bg-[#f5eddc]">
                <div className="flex flex-col gap-2">
                  <img className="object-contain" src={item.img} />
                  <p>{item.name_product.substring(0,26)+'...'}</p>
                  <p>like :{item.like}</p>
                  <div className=" flex flex-row w-min  my-2 rounded-xl text-xs ">{"Rp."+item.price[0].toLocaleString()}
                  </div>
                </div>
              </div> </a>
            </Link>)}
          </div>
        </div>
      </section> 
        </MainLayout>
    );
}


export default Details