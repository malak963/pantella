import { Button } from '../components/ui/button';
import { Trash } from 'lucide-react';
import { CartItem as Item, useCartStore } from '../store/cartStore';

export function CartItem({ item }: { item: Item }) {
  const { increaseQty, decreaseQty, removeFromCart } = useCartStore();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <img src={item.thumbnail} className="w-20 rounded-xl" />
        <div>
          <h4 className="font-semibold">{item.title}</h4>
          <p>${item.price}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button className="m-5 cursor-pointer hover:bg-pink-950 transition-colors duration-150" size="sm" onClick={() => decreaseQty(item.id)}>-</Button>
        <span>{item.quantity}</span>
        <Button className="m-5 cursor-pointer hover:bg-pink-950 transition-colors duration-150" size="sm" onClick={() => increaseQty(item.id)}>+</Button>
        <Button className="m-5 cursor-pointer hover:bg-pink-950 transition-colors duration-150"size="icon" variant="destructive" onClick={() => removeFromCart(item.id)}>
          <Trash size={18} />
        </Button>
      </div>
    </div>
  );
}

