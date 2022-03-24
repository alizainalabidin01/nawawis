import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Link from 'next/link'

function Navbar() {
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className=" shadow-sm w-full z-10 bg-[#f3f1ed]">
      <div className="w-full">
        <div className="flex flex-col items-center ">
        <div className="flex flex-row items-center h-20 w-full">
          <div className="flex items-center mx-8 md:mx-20 justify-between w-full">
            <div className="flex justify-center items-center flex-shrink-0 ">
              <Link href='/'><a>
              <h2>Nawawis Boutique</h2>
              </a></Link>
            </div>
            <div className="ml-3 md:ml-10 flex items-baseline space-x-4 ">
                {/* <Link href='/'>
                  <a className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-1 py-1 text-xm md:px-3 md:py-2 rounded-md md:text-sm font-medium " >
                  <i class="fa-solid fa-user"></i>
                  </a>
                </Link> */}
                <Link href='/cart'>
                  <a className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-1 py-1 text-xm md:px-3 md:py-2 rounded-md md:text-sm font-medium" >
                  <i classname="fa-solid fa-bag-shopping"></i>
                  </a>
                </Link>
                {/* <Link href='/'>
                  <a className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-1 py-1 text-xm md:px-3 md:py-2 rounded-md md:text-sm font-medium" >
                  <i class="fa-solid fa-magnifying-glass"></i>
                  </a>
                </Link> */}
              </div>
            
          </div>
         
        </div>
        <div className="flex flex-row items-center mx-20 justify-between w-full">
        <div className="items-center mx-7 md:mx-16  justify-between w-full font-['serif']">
        <Link href='/'>
                  <a className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-1 py-1 text-xs md:px-3 md:py-2 rounded-md md:text-sm font-medium" >
                  <span>New Arrival</span>
                  </a>
                </Link>
                <Link href='/'>
                  <a className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-1 py-1 text-xs md:px-3 md:py-2 rounded-md md:text-sm font-medium" >
                  <span>Best Seller</span>
                  </a>
                </Link>
                <Link href={'/type/suit'} key={'suit'}>
                  <a className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-1 py-1 text-xs md:px-3 md:py-2 rounded-md md:text-sm font-medium" >
                  <span>Suit</span>
                  </a>
                </Link>
                <Link href={'/type/dress'} key={'dress'}>
                  <a className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-1 py-1 text-xs md:px-3 md:py-2 rounded-md md:text-sm font-medium" >
                  <span>Dress</span>
                  </a>
                </Link>
                <Link href={'/type/pants'} key={'pants'}>
                  <a className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-1 py-1 text-xs md:px-3 md:py-2 rounded-md md:text-sm font-medium" >
                  <span>Pants</span>
                  </a>
                </Link>
        </div></div>
        </div></div></nav>)}
        {/* <div className="flex flex-row items-center mx-20 justify-between w-full">
        <div className="mr-10 flex md:hidden "> */}
            {/* <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-black inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <i class="fa-solid fa-chevron-up"></i>
              ) : (
                <i class="fa-solid fa-chevron-down"></i>
              )}
            </button>
          </div> */}
        {/* <div className="hidden md:block items-center mx-20 justify-between w-full">
                <Link href='/'>
                  <a className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium" >
                  <span>New Arrival</span>
                  </a>
                </Link>
                <Link href='/'>
                  <a className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium" >
                  <span>Best Seller</span>
                  </a>
                </Link>
                <Link href='/'>
                  <a className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium" >
                  <span>Suit</span>
                  </a>
                </Link>
                <Link href='/'>
                  <a className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium" >
                  <span>Dress</span>
                  </a>
                </Link>
                <Link href='/'>
                  <a className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium" >
                  <span>Hijab</span>
                  </a>
                </Link>
            </div>
        </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="md:hidden text-center" id="mobile-menu">
            <div
              ref={ref}
              className="bg-white px-2 pb-3 space-y-1 sm:px-3">
               <Link href='/'>
                  <a className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium" >
                  <span>New Arrival</span>
                  </a>
                </Link>
                <Link href='/'>
                  <a className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium" >
                  <span>Best Seller</span>
                  </a>
                </Link>
                <Link href='/'>
                  <a className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium" >
                  <span>Suit</span>
                  </a>
                </Link>
                <Link href='/'>
                  <a className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium" >
                  <span>Dress</span>
                  </a>
                </Link>
                <Link href='/'>
                  <a className="cursor-pointer hover:bg-gray-500 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium" >
                  <span>Hijab</span>
                  </a>
                </Link>
            </div>
          </div>
        )}
      </Transition> */}
    {/* </nav> */}
  // );
// }

export default Navbar;
