'use client'

import React, { useContext } from 'react'
import { Button } from "@/components/ui/button"

import CartContext from "@/app/equipmentpage/cartContext"

export interface Equipment {
  img: string;
  name: string;
  desc: string;
  stock: number;
  id: string;
  quantity: number;
}

interface EquipmentProps {
  product: Equipment;
}

// interface CartItem {
//   product: PostProps;
//   quantity: number;
// }

const EquipmentCard : React.FC<EquipmentProps> = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);

  const addToCartHandler = () => {
    addItemToCart({
      id: product.id,
      name: product.name,
      image: product.img,
      stock: product.stock,
      quantity: product.quantity,
    });
  };

  const [currentQuantity, setCurrentQuantity] = React.useState(0);

  // const handleIncrement = () => {
  //   setCurrentQuantity(Math.min(currentQuantity + 1, product.product?.stock));
  //   // ADD TO CART SHI:
  //   const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[];
  //   const existingItem = cartItems.find(item => item.product.id === product.id);

  //   if(existingItem) {
  //     existingItem.quantity += currentQuantity;
  //   } else {
  //     cartItems.push({product: {id, name, eqDesc, img, product?.stock}, quantity: currentQuantity});
  //   }

  //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
  // };

  const handleDecrement = () => {
    setCurrentQuantity(Math.max(currentQuantity - 1, 0)); // Prevent negative quantity
    // ADD TO CART SHI:
    // const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[];
    // const existingItem = cartItems.find(item => item.product.id === id)!;

    // if(existingItem) {
    //   existingItem.quantity -= 1;
    // } else {
    //   cartItems.splice(cartItems.indexOf(existingItem), 1);
    // }

    // localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  // ATTEMPT NAKO SA PAG ADD TO CART:
  // const addToCart = () => { 
  //   const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[];
  //   const existingItem = cartItems.find(item => item.product.id === id);

  //   if(existingItem) {
  //     existingItem.quantity += currentQuantity;
  //   } else {
  //     cartItems.push({product: {id, name, eqDesc, img, product?.stock}, quantity: currentQuantity});
  //   }

  //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
  // }

  // const addToCart = (itemId: number) => {
  //   // Use context or state function to add item to cart based on your chosen approach
  //   setCartItems((prevItems) => [...prevItems, { id: itemId, count }]); // If using Next.js state
  // };

  // Log the entire product object
  console.log("Product object:", product);

  // Log individual properties
  console.log("Product ID:", product?.id);
  console.log("Product Name:", product?.name);
  console.log("Product Image URL:", product.img);
  console.log("Product Stock:", product.stock);

  return (
      <div className="mx-5 my-5 max-w-[300px] bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-lg flex-grow">
        <img
          alt={product?.name}
          className="w-full h-48 object-cover"
          height={300}
          src={product?.img}
          style={{
            aspectRatio: "400/300",
            objectFit: "cover",
          }}
          width={400}
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product?.name}</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
              {product?.desc}
          </p>
          <div className="flex items-center justify-between">
              <span className={ `${product?.stock === 0 && 'text-red-500' || product?.stock > 5 && 'text-green-500' || 'text-yellow-500' } flex flex-row font-medium text-sm`}>{ product?.stock == 0 && "Out of Stock" ||  product?.stock <= 5 && "Limited Stock" || "In Stock"} 
                {
                  (product?.stock > 0 && product?.stock < 5)
                    ? <p className='ml-1 text-gray-400'>({product?.stock} left)</p>
                    : null
                }
              </span>
              <div className="flex items-center gap-2">
                {/* <Button { ...product?.stock == 0 && { disabled: true } } className="bg-[#9B151E] hover:bg-[#9B151E]/90 text-white " size="sm" onClick={handleDecrement}>
                  -
                </Button>
                <span className="text-gray-900 dark:text-gray-50 font-medium">{currentQuantity}</span>
                <Button { ...product?.stock == 0 && { disabled: true } } className="bg-[#9B151E] hover:bg-[#9B151E]/90 text-white" size="sm" onClick={handleIncrement0}>
                  +
                </Button> */}
                <Button className="bg-[#9B151E] hover:bg-[#9B151E]/90 text-white" onClick={addToCartHandler} >Add to Cart</Button>
              </div>
              
          </div>
        </div>
    </div>
  );
};

export default EquipmentCard