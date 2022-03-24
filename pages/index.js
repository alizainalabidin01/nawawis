import MainLayout from "../components/layout";
import Slider from "../components/slider";
// import { sql_query } from "../lib/db.js"
import Link from "next/link"
import axios from "axios";

export default function Home({datanew, databest, dataall}) {
  return (
    <MainLayout>
      <Slider/>
      <section className="shadow-md px-2">
        <h6 className="my-5 mx-6 sm:text-2xl font-['serif']">NEW Arrival</h6>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 justify-center">
          {datanew.map((item)=>
            <Link href={'/detail/' + item._id} key={item._id}>
              <div className="flex flex-col gap-2 p-1 my-1 font-['sans-serif'] text-xs bg-white hover:bg-[#f5eddc]">
                <div className="flex flex-col gap-2">
                  <img className="object-contain" src={item.img} />
                  <p>{item.name_product.substring(0,26)+'...'}</p>
                  <p>like :{item.like}</p>
                  
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

      <section className="shadow-md px-2">
        <h6 className="my-5 mx-6 sm:text-2xl font-['serif']">All Product</h6>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 justify-center">
          {dataall.map(item=>
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
  )
}

export const getServerSideProps = async () => {
    const new1 = await axios.get("http://localhost:3000/api/product/newarrival")
    const best = await axios.get("http://localhost:3000/api/product/bestseller")
    const all = await axios.get("http://localhost:3000/api/product")
    // const best = await  sql_query('SELECT * FROM kriyathor2 ORDER BY sold_produk DESC LIMIT 6')
    // let databest = JSON.parse(JSON.stringify(best))
    return {
      props : {
        datanew : new1.data,
        databest : best.data,
        dataall : all.data
      }
    };

}