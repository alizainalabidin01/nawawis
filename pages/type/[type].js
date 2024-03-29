// import { sql_query } from "../../lib/db.js"
import MainLayout from "../../components/layout";
import Link from "next/link"
// import axios from "axios";
import dbConnect from "../../utils/mongo";
import products from "../../models/product";
// import order from "../../models/order";

export const getServerSideProps = async ({params}) => {
  await dbConnect();
  const type = params
  const data = await products.find(type);

  // Pass data to the page via props
  return {
    props: {
      datatype: JSON.parse(JSON.stringify(data)),
    },
  };

  // await dbConnect();
  // const res = await axios.get(`http://localhost:3000/api/product/${params.type}`)
 
  // return {
  //   props : {
  //     datatype : res.data,
  //     // databest : best.data
  //   }
  // };

}

function Type ({datatype}) {
    
    return(
        <MainLayout>
        <section className="shadow-md px-2">
        <h6 className="my-5 mx-6 sm:text-2xl font-['serif']">{(datatype.type)}</h6>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 justify-center">
          {datatype.map(item=>
            <Link href={'/pesanan/' +item._id} key={item._id}><a>
              <div className="flex flex-col gap-2 p-1 my-1 font-['sans-serif'] text-xs bg-white hover:bg-[#f5eddc]">
                <div className="flex flex-col gap-2">
                  <img className="object-contain" src={item.img[0]} />
                  <p>{item.name_product.substring(0,26)}</p>
                 
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


export default Type