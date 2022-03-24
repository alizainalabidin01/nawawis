import MainLayout from "../components/layout";
import Slider from "../components/slider";
// import { sql_query } from "../lib/db.js"
import Link from "next/link"
import axios from "axios";
import dbConnect from "../utils/mongo";
import products from "../models/product";
import order from "../models/order";

export default function Home({dataorder}) {
    
  return (
    <MainLayout>
      <Slider/>
      <section className="shadow-md px-2">
        <h6 className="my-5 mx-6 sm:text-2xl font-['serif']">Order</h6>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 justify-center">
          {dataorder.map((item)=>
            <Link href={'/payment/' + item._id} key={item._id}><a>
              <div className="flex flex-col gap-2 p-1 my-1 font-['sans-serif'] text-xs bg-white hover:bg-[#f5eddc]">
                <div className="flex flex-col gap-2">
                  <img className="object-contain" src={item.product_img} />
                  <p>Name Product :{item.name_product.substring(0,26)+'...'}</p>
                  <p>Size :{item.size}</p>
                  <p>Addres : {item.addres}</p>
                  <p>Note : {item.note}</p>
                  <p>Customer : {item.name_customer}</p>
                  <p>Status : {item.status}</p>
                  
                  <div className=" flex flex-row w-min  my-2 rounded-xl text-xs ">{"Rp."+item.total.toLocaleString()}
                  </div>
                </div>
              </div> </a>
            </Link>)}
          </div>
        </div>
      </section>
 
    </MainLayout>
  )
}

export const getServerSideProps = async () => {
    await dbConnect();
    const res = await axios.get("http://localhost:3000/api/order")
    // const best = await  sql_query('SELECT * FROM kriyathor2 ORDER BY sold_produk DESC LIMIT 6')
    // let databest = JSON.parse(JSON.stringify(best))
    return {
      props : {
        
        dataorder : res.data,
      
      }
    };

}
