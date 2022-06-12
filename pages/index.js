import MainLayout from "../components/layout";
import Slider from "../components/slider";
// import { sql_query } from "../lib/db.js"
import Link from "next/link"
// import axios from "axios";
import dbConnect from "../utils/mongo";
import products from "../models/product";
// import order from "../models/order";
export default function Home({datanew, databest, dataall}) {
  return (
    <MainLayout>
      <Slider/>
      
      <section className="shadow-md px-2">
        <h6 className="my-5 mx-6 sm:text-2xl font-['serif']">New Arrival</h6>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 justify-center">
          {datanew.map((item)=>
            <Link href={'/pesanan/' + item._id} key={item._id}>
              <div className="flex flex-col gap-2 p-1 my-1 font-['sans-serif'] text-xs bg-white hover:bg-[#f5eddc]">
                <div className="flex flex-col gap-2">
                  <img className="object-contain" src={item.img[0]} />
                  <p>{item.name_product.substring(0,26)}</p>
                  <p>Like :{item.like}</p>
                  
                  <div className=" flex flex-row w-min  my-2 rounded-xl text-xs ">{"Rp."+item.price[0].toLocaleString()}
                  </div>
                </div>
              </div> 
            </Link>)}
          </div>
        </div>
      </section>
 
       <section className="shadow-md px-2">
        <h6 className="my-5 mx-6 sm:text-2xl font-['serif']">Best Seller</h6>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 justify-center">
          {databest.map(item=>
            <Link href={'/pesanan/' +item._id} key={item._id}><a>
              <div className="flex flex-col gap-2 p-1 my-1 font-['sans-serif'] text-xs bg-white hover:bg-[#f5eddc]">
                <div className="flex flex-col gap-2">
                  <img className="object-contain" src={item.img[0]} />
                  <p>{item.name_product.substring(0,26)+'...'}</p>
                  <p>Like :{item.like}</p>
                  <div className=" flex flex-row w-min  my-2 rounded-xl text-xs ">{"Rp."+item.price[0].toLocaleString()}
                  </div>
                </div>
              </div> </a>
            </Link>)}
          </div>
        </div>
      </section> 

      <section className="shadow-md px-2">
        <h6 className="my-5 mx-6 sm:text-2xl font-['serif']">All Product</h6>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 justify-center">
          {dataall.map(item=>
            <Link href={'/pesanan/' +item._id} key={item._id}><a>
              <div className="flex flex-col gap-2 p-1 my-1 font-['sans-serif'] text-xs bg-white hover:bg-[#f5eddc]">
                <div className="flex flex-col gap-2">
                  <img className="object-contain" src={item.img[0]} />
                  <p>{item.name_product.substring(0,26)+'...'}</p>
                  <p>Like :{item.like}</p>
                  <div className=" flex flex-row w-min  my-2 rounded-xl text-xs ">{"Rp."+item.price[0].toLocaleString()}
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
    var pipeline = [
        {$sort :{"sold":-1 }}
    ]
  const data = await products.find().lean().limit(6);
  
  const best = await products.aggregate(pipeline).limit(6)
  const all = await products.find();

  // Pass data to the page via props
  return {
    props: {
      datanew: JSON.parse(JSON.stringify(data)),
      databest: JSON.parse(JSON.stringify(best)),
      dataall: JSON.parse(JSON.stringify(all)),
    },
    
  };
  
}
//     const new1 = await axios.get("http://localhost:3000/api/product/newarrival")
//     const best = await axios.get("http://localhost:3000/api/product/bestseller")
//     const all = await axios.get("http://localhost:3000/api/product")
//     // const best = await  sql_query('SELECT * FROM kriyathor2 ORDER BY sold_produk DESC LIMIT 6')
//     // let databest = JSON.parse(JSON.stringify(best))
//     return {
//       props : {
//         datanew : new1.data,
//         databest : best.data,
//         dataall : all.data
//       }
//     };

// }
