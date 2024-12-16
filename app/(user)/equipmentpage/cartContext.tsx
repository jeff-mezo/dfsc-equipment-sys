"use client"

import { useRouter } from "next/navigation";
import { createContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string;
  eq_id: string;
  name: string;
  image: string;
  stock: number;
  quantity: number;
  borrowDate: string;
  returnDate: string;
}

export interface Cart {
  cartItems: CartItem[];
}

interface CartContextType {
  cart: Cart;
  addItemToCart: (item: CartItem) => void;
  deleteItemFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cart: { cartItems: [] },
  addItemToCart: () => {},
  deleteItemFromCart: () => {},
  clearCart: () => {},
});



export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({ cartItems: [] });

  const router = useRouter();

  
  useEffect(() => {
    setCartToState();
  }, []);
  
  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") as string)
      : { cartItems: [] }
    );
  };

  // when user checks out
  const clearCart = () => {
    localStorage.removeItem("");
    setCart({cartItems: []});
  };
  
  const addItemToCart = ({
    id,
    eq_id,
    name,
    image,
    stock,
    quantity = 1,
    borrowDate,
    returnDate,
  }: CartItem) => {
    
  
    
    const item: CartItem = {
      id,
      eq_id,
      name,
      image,
      stock,
      quantity,
      borrowDate,
      returnDate,
    };

    const isItemExist = cart.cartItems.find((i) => i.id === item.id);

    let newCartItems: CartItem[];

    if (isItemExist) {
      newCartItems = cart.cartItems.map((i) =>
        i.id === isItemExist.id ? item : i
      );
    } else {
      newCartItems = [...cart.cartItems, item];
    }

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromCart = (id: string) => {
    console.log("deleting..")
    const newCartItems = cart.cartItems.filter((i) => i.id !== id);

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        deleteItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;



// "use client"

// import { useRouter } from "next/navigation";
// import { createContext, useState, useEffect, ReactNode } from "react";

// export interface CartItem {
//   id: string;
//   name: string;
//   image: string;
//   stock: number;
//   quantity: number;
// }

// export interface Cart {
//   cartItems: CartItem[];
// }

// interface CartContextType {
//   cart: Cart[];
//   addItemToCart: (item: CartItem) => void;
//   deleteItemFromCart: (id: string) => void;
// }

// const CartContext = createContext<CartContextType>({
//   cart: [],
//   addItemToCart: () => {},
//   deleteItemFromCart: () => {},
// });

// export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   const router = useRouter();

//   useEffect(() => {
//     setCartToState();
//   }, []);

//   const setCartToState = () => {
//     setCart(
//       localStorage.getItem("cart")
//         ? JSON.parse(localStorage.getItem("cart") as string).cartItems
//         : []
//     );
//   };

//   const addItemToCart = ({
//     id,
//     name,
//     image,
//     stock,
//     quantity = 1,
//   }: CartItem) => {
//     const item: CartItem = {
//       id,
//       name,
//       image,
//       stock,
//       quantity,
//     };

//     const isItemExist = cart.find((i) => i.id === item.id);

//     let newCartItems: CartItem[];

//     if (isItemExist) {
//       newCartItems = cart.map((i) =>
//         i.id === isItemExist.id ? item : i
//       );
//     } else {
//       newCartItems = [...cart, item];
//     }

//     localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
//     setCartToState();
//   };

//   const deleteItemFromCart = (id: string) => {
//     const newCartItems = cart.filter((i) => i.id !== id);

//     localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
//     setCartToState();
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addItemToCart,
//         deleteItemFromCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartContext;





// // import { useRouter } from 'next/navigation';
// // import React, { createContext, ReactNode, useEffect, useState } from 'react';

// // interface CartItem {
// //     id: number;
// //     name: string;
// //     image: string;
// //     stock: number;
// //     quantity: number;
// //   }

// // interface MyComponentProps {
// //     children?: React.ReactNode; // Optional children prop
// // }

// // interface CartContextType {
// //     cart: CartItem[];
// //     addItemToCart: (item: CartItem) => void;
// //     deleteItemFromCart: (id: string) => void;
// // }

// // const CartContext = createContext<CartContextType>({
// //     cart: [],
// //     addItemToCart: () => {},
// //     deleteItemFromCart: () => {},
// // });

// // export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
// //     const [cart, setCart] = useState<CartItem[]>([]);

// //   const router = useRouter;
  
// //   useEffect(() => {
// //     setCartToState();
// //   }, []);

// //   const setCartToState = () => {
// //     setCartItems(
// //       localStorage.getItem("cart")
// //         ? JSON.parse(localStorage.getItem("cart") || "[]")
// //         : []
// //     );
// //   };

// //   const addItemToCart = async (item: Partial<CartItem> = {}): Promise<void> => {
// //     // ... (rest of your implementation using the typed CartItem interface)
  
// //     const newItem: CartItem = {
// //       id: item.id || 0, // Handle missing id with empty string
// //       name: item.name || "", // Handle missing name with empty string
// //       image: item.image || "", // Handle missing image with empty string
// //       stock: item.stock || 0, // Handle missing stock with 0
// //       quantity: Math.max(1, item.quantity || 1), // Ensure quantity is at least 1
// //     };
  
// //     // ... (further processing using the validated newItem object)

// //     const isItemExist = cart.find((i) => i.id === item.id);
  
// //     let newCartItems: CartItem[];

// //     if(isItemExist) {
// //         newCartItems = cart.map((i) => 
// //             i.id === isItemExist.id ? item : i
// //         );
// //     }

// //   };

  

// // //   const addToCart = (itemId: number) => {
// // //     const existingItem = cartItems.find((item) => item.id === itemId);
// // //     if (existingItem) {
// // //       setCartItems((prevItems) =>
// // //         prevItems.map((item) =>
// // //           item.id === itemId ? { ...item, count: item.count + 1 } : item
// // //         )
// // //       );
// // //     } else {
// // //       setCartItems((prevItems) => [...prevItems, { id: itemId, count: 1 }]);
// // //     }
// // //   };

// // //   const removeFromCart = (itemId: number) => {
// // //     setCartItems((prevItems) =>
// // //       prevItems.filter((item) => item.id !== itemId)
// // //     );
// // //   };

// // //   //const value = { cartItems, addToCart, removeFromCart };

// // //   return <CartContext.Provider value={
// // //     {
// // //         cartItems, 
// // //         addToCart, 
// // //         removeFromCart
// // //     }
// // //   }>
// // //     {children}
// // // </CartContext.Provider>;
// // // };

// // //export { CartContext, CartProvider };
