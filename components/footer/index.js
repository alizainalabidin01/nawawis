import Link from 'next/link'

const Footer = () => {
    return (
      <footer className="shadow-md bottom-0" >
        <div className="flex flex-col bg-[#f3f1ed] p-8 sm:flex-row">
          <div className="flex flex-col gap-5 items-center text-center sm:gap-10 sm:items-start sm:flex-row">
            <div className="mx-8">
              <Link href="/">
                <span className="w-24"> Nawawis Boutique</span>
              </Link>
            </div>
  
            <div className="text-sm text-center">
              <h5 className="font-bold uppercase"> Follow </h5>
              <ul className="flex-col gap-4 sm:flex-row items-center">
              <li className="flex gap-2 pb-2"> <i className="fa fa-shopping-bag"></i><Link href="https://shopee.co.id/nawawis.boutique?smtt=0.131462281-1654134687.9">  Nawawi's Boutique </Link></li>
                <li className="flex gap-2 pb-2">  <i className="fab fa-instagram"></i><Link href="https://instagram.com/nawawis.boutique?igshid=YmMyMTA2M2Y=">  Nawawi's Boutique </Link></li>
              </ul>
            </div>
            <div className="text-sm text-center sm:text-left">
              <h5 className="font-bold uppercase"> Help </h5>
              <ul className="flex-col text-center items-start sm:text-left sm:items-center">
                <li className="pb-2"> About Us </li>
                <li className="pb-2"> Term & Policy </li>
                <li className="pb-2"> FAQs </li>
              </ul>
            </div>
          </div>
          <div className="flex-auto mt-10 pl-4 text-sm sm:mt-0">
            <h5 className="font-bold uppercase text-center"> Payment Methods </h5>
            <div className="flex flex-wrap justify-center mt-5 gap-2 sm:gap-7">
              <img src="/images/bca.png" className="w-auto h-5" />
              <img src="/images/bri.png" className="w-auto h-5" />
              <img src="/images/dana.png" className="w-auto h-5" />
              <img src="/images/line.png" className="w-auto h-5" />
              <img src="/images/shopeepay.png" className="w-auto h-5" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center bg-[#f3f1ed] py-8">
          <div className="flex flex-col justify-center bg-[#f3f1ed] pt-4 border-solid border-t-4 border-gray-50 mx-4 lg:flex-row">
            <p className="text-center"> ©NAWAWIS_BOUTIQUE 2022 </p>
          </div>
        </div>
      </footer>
    )
  }
  export default Footer