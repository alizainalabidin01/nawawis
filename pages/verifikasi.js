import React from 'react';
import MainLayout from "../components/layout";
import dbConnect from '../utils/mongo';
import order from '../models/order';
import bodyParser from 'body-parser';
import { promisify } from 'util';

const getBody = promisify(bodyParser.urlencoded());

export const getServerSideProps = async ({ req, res }) => {
  await dbConnect();
  const data = await order.find({'statuss': 'pembayaran sedang di verifikasi'});
    if (req.method === "POST") {
     await getBody(req, res);
     const statuss = req.body.status
     const id = req.body.id
     const pay = ({
              statuss
            })
     await order.update({"_id":`${id}`},{$set: pay})
    }
    
  return {
    props: {
      dataPay: JSON.parse(JSON.stringify(data)),
    },
  };
};

export default function verificationt({ dataPay }) {
  
  return (
    <MainLayout>
    <div>
      <h1 className='p-2 text-lg text-center'>Verifikasi Pembayaran</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 gap-11 justify-center">
        {dataPay.map((item) => 
          // eslint-disable-next-line react/jsx-key
          <div className="flex flex-col gap-2 p-1 my-1 font-['sans-serif'] text-xs bg-white hover:bg-[#d1b780]">
            <div className="flex flex-col  gap-2">
                <div className='flex h-96 w-full'>
                    <img className="object-contain" src={item.imgPay} />
                </div>
              <div className='flex flex-row justify-between w-full'>
              <div className='flex flex-col'>
              <p>{item.name_product.substring(0, 26)}</p>
              <p className=" py-2  text-xs ">
                {'Rp.' + item.total.toLocaleString()}
                </p>
                </div>
                <div className='flex'>
                <img className=" h-14" src={item.product_img} />
                
                </div>
                </div><form method="POST" name="verifikasi">
                  <input
                    name="id"
                    className='opacity-0 h-0'
                    defaultValue={(item._id)}
                    readOnly="readonly"
                  />
                  <input
                    name="status"
                    className='opacity-0 h-0'
                    defaultValue={'Pembayaran berhasil di verifikasi'}
                    readOnly="readonly"
                  />
                  <div className="bg-[#f5eddc] flex flex-row w-full mx-auto p-2 my-2 rounded-xl text-sm sm:text-base justify-center ">
                    <button className='w-full'> verifikasi pembayaran</button>
                  </div></form>

                  <form method="POST" name="verifikasi">
                  <input
                    name="id"
                    className='opacity-0 h-0'
                    defaultValue={(item._id)}
                    readOnly="readonly"
                  />
                  <input
                    name="status"
                    className='opacity-0 h-0'
                    defaultValue={'Pembayaran gagal'}
                    readOnly="readonly"
                  />
                  <div className="bg-red-400 flex flex-row w-full mx-auto p-2 my-2 rounded-xl text-sm sm:text-base justify-center ">
                    <button className='w-full'> tolak pembayaran</button>
                  </div></form>
                  
              
              
            </div>
          </div>  
        )}
      </div>
    </div></MainLayout>
  );
}
