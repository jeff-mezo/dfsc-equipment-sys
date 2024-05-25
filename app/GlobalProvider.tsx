import React, { ReactNode } from 'react'
import { CartProvider } from '@/app/equipmentpage/cartContext';

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {

    return <CartProvider>{children}</CartProvider>;

}
