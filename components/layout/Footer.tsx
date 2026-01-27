/** @format */
"use client"
import Image from "next/image";
import logo from "../../public/images/logo2.png";
import "../../app/globals.css";
import { useRouter, usePathname } from "next/navigation";

const Footer = () => {
   const pathname = usePathname();
   if (
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/complete-profile")
  ) {
    return null;
  }
  return (
    <section className='bg-black text-white m-auto '>
      <div className='container grid grid-cols-1 gap-5 lg:gap-2 md:grid-cols-2 lg:grid-cols-3 place-items-center py-5 '>
        <div>
          <Image src={logo} alt='logo' width='200' className='rounded-full' />
        </div>
        <div>
          <h2 className='text-red-200 font-bold border-b-2 border-red-200 mb-5'>
            LINKS
          </h2>
          <div className='flex flex-col gap-2 cursor-pointer'>
            {" "}
            <span>Search</span>
            <span>Products</span>
            <span>Categories</span>
          </div>
        </div>

        <div>
          <h2 className='text-red-200 font-bold border-b-2 border-red-200 mb-5'>
            CONTACT Us
          </h2>
          <div className='flex flex-col gap-2'>
            <div className='flex'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-6'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z'
                />
              </svg>

              <span className='cursor-pointer'>+963 968 106 914</span>
            </div>

            <div className='flex'>
              {" "}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-6'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
                />
              </svg>
              <span>pentella@gmail.com</span>
            </div>
            <div className='flex justify-center items-center gap-5'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-6 h-6 bg-red-200  rounded-full cursor-pointer text-black'>
                <path d='M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Z' />
                <path d='M12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7Z' />
                <circle cx='17.5' cy='6.5' r='1' />
              </svg>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                className='w-6 h-6 bg-red-200  rounded-full cursor-pointer text-black'>
                <path d='M13.5 9H16V6h-2.5C11.57 6 11 7.43 11 8.75V11H9v3h2v7h3v-7h2.25L17 11h-3V9.75c0-.5.25-.75.5-.75Z' />
              </svg>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-6 h-6 bg-red-200  rounded-full cursor-pointer text-black'>
                <path d='M18.9 2H21l-6.6 7.6L22 22h-6.2l-4.9-6.2L5.3 22H3.2l7-8L2 2h6.3l4.4 5.6L18.9 2Zm-2.2 18h1.7L7.4 4H5.6l11.1 16Z' />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className='py-5'>
        {" "}
        <hr className='border-red-200 border-1 ' />
        <p className='pl-10 py-2 font-bold text-sm'>copyright@2026 Pantella</p>
      </div>
    </section>
  );
};

export default Footer;
