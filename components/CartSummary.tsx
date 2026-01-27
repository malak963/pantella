import Link from 'next/link';
import { Button } from '../components/ui/button';
import { useCartStore } from '../store/cartStore';

export function CartSummary() {
  
  const items = useCartStore(s => s.items);
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="flex justify-between items-center pt-6">
      <h2 className="font-semibold text-3xl text-center m-5 italic text-amber-800">Total: ${total.toFixed(2)}</h2>
      <Link href="/checkout">
        <Button className=' cursor-pointer hover:bg-pink-950 transition-colors duration-150'>Checkout</Button>
      </Link>
    </div>
  );
}

