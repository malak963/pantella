/** @format */
"use client";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import Product from "./Product";

const categories = [
  {
    id: 1,
    name: " Beauty",
    slug: "beauty",
  },
    {
    id: 2,
    name: "Fragrances",
    slug: "fragrances",
  },
  {
    id: 3,
    name: "Furniture",
    slug: "furniture",
  },

  {
    id: 4,
    name: "Groceries",
    slug: "groceries",
  },

];

export default function Categories() {
  return (
    <section className=''>
      <div
        className=' group 
      flex justify-center text-2xl hover:text-amber-700 items-center gap-1 p-4 font-semibold '>
        <Link href='/products'>SHOP NOW</Link>
        <ArrowRightCircle
          className='cursor-pointer
        transition-transform
        duration-300
        ease-out
        group-hover:translate-x-2 '
        />
      </div>

      <div className='flex flex-col w-fit items-center m-auto lg:flex-row pt-4  justify-center gap-20 '>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className=' text-xl italic text-amber-950 font-semibold border-b-1 border-amber-950'>
            {category.name}
          </Link>
        ))}
      </div>
      <Product />
    </section>
  );
}
