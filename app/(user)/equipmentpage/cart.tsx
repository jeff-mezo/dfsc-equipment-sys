import React from 'react'

interface CartItems {
    id: number;
    name: string;
    description: string;
    img: string;
    stock: number;
  }

const CartView:React.FC<{cartItems: CartItems[]}> = ({cartItems}) => {
  return (
    cartItems && cartItems.map(( item, index ) => (     
        <div className="grid gap-4 py-4" key={index}>
            <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                <img
                alt="item"
                className="aspect-square rounded-md object-cover"
                height={64}
                src={ item.img }
                width={64}
                />
                <div className="space-y-1">
                <p className="font-medium">{ item.name }</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: { item.stock }</p>
                </div>
            </div>
        </div>
    ))
  )
}

export default CartView;
