/** @format */

import Image from "next/image";
import prod1 from "../../public/images/product1.png";
import prod2 from "../../public/images/product2.png";
import prod3 from "../../public/images/product3.png";
import prod4 from "../../public/images/product4.png";
import Link from "next/link";

export default function Product() {
    const prodcuts = [
        { id: crypto.randomUUID(), imgae: { prod1 } },
        { id: crypto.randomUUID(), imgae: { prod2 } },
        { id: crypto.randomUUID(), imgae: { prod3 } },
        { id: crypto.randomUUID(), imgae: { prod4 } },
    ];
    return (
        <section>
            <div className='hidden lg:flex justify-center gap-20 m-4 '>
                <div className='rounded-full'>
                    <Image
                        src={prod1}
                        alt='product1'
                        width='100'
                        className='rounded-full'
                    />
                </div>

                <Image
                    src={prod2}
                    alt='product1'
                    width='100'
                    className='rounded-full'
                />
                <Image
                    src={prod3}
                    alt='product1'
                    width='100'
                    className='rounded-full'
                />
                <Image
                    src={prod4}
                    alt='product1'
                    width='100'
                    className='rounded-full'
                />
            </div>
        </section>
    );
}
