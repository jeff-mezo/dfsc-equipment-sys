"use client";

import React, { useContext } from "react";
import CartContext from "@/app/(user)/equipmentpage/cartContext";
import Link from "next/link";
import CartItem from "@/app/(user)/equipmentpage/cartContext"
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface CartItem {
    id: string;
    name: string;
    image: string;
    stock: number;
    quantity: number;
}

interface ItemProps {
    item: CartItem;
}

const Cart: React.FC<ItemProps> = ( item ) => {
//   const { addItemToCart, deleteItemFromCart, cart } = useContext(CartContext);

//   const increaseQty = (cartItem: CartItem) => {
//     const newQty = cartItem.quantity + 1;
//     const item = { ...cartItem, quantity: newQty };

//     if (newQty > cartItem.stock) return;

//     addItemToCart(item);
//   };

//   const decreaseQty = (cartItem: CartItem) => {
//     const newQty = cartItem.quantity - 1;
//     const item = { ...cartItem, quantity: newQty };

//     if (newQty <= 0) return;

//     addItemToCart(item);
//   };


//   const amountWithoutTax = cart?.cartItems?.reduce(
//     (acc: number, item: CartItem) => acc + item.quantity * item.price,
//     0
//   );

//   const taxAmount = (amountWithoutTax * 0.15).toFixed(2);

//   const totalAmount = (Number(amountWithoutTax) + Number(taxAmount)).toFixed(2);

  return (
    <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
        <dd className="text-sm text-gray-900 dark:text-gray-100">Microscope</dd>
        <div className="flex items-center">
            <Button className=" sm:mt-0 bg-[#9B151E]" size={"sm"}>-</Button>
            <span className="mx-5 text-gray-900 dark:text-gray-50 font-medium">1</span>
            {/* <Input className='min-w-12 w-12 mx-2' type='number' value={1}></Input> */}
            <Button className=" sm:mt-0 bg-[#9B151E]" size={"sm"}>+</Button>
            {/* <Input
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            type="text"
            /> */}
        </div>
        <div className="flex items-center space-x-4">
            <div className="flex-1">
            <Input
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                type="datetime-local"
            />
            </div>
            <div className="flex-1">
            <Input
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                type="datetime-local"
            />
            </div>
        </div>
        </div>
  )
}
