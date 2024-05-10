'use client'

import React from 'react'
import { Button } from "@/components/ui/button"

interface PostProps {
  eqImg: string;
  eqName: string;
  eqDesc: string;
  eqStock: number;
}

const EquipmentCard : React.FC<PostProps> = ({
  eqImg,
  eqName,
  eqDesc,
  eqStock,
}) => {
  
  // let isDisabled = 0;

  // if (eqStock == 0) {
  //   isDisabled = 1;
  // } else if (eqStock <= 5) {
  //   isDisabled = 2;
  // }

  const [currentQuantity, setCurrentQuantity] = React.useState(0);

  const handleIncrement = () => {
    setCurrentQuantity(Math.min(currentQuantity + 1, eqStock));
  };

  const handleDecrement = () => {
    setCurrentQuantity(Math.max(currentQuantity - 1, 0)); // Prevent negative quantity
  };

  return (
      <div className="mx-5 my-5 max-w-[300px] bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-lg flex-grow">
        <img
          alt={eqName}
          className="w-full h-48 object-cover"
          height={300}
          src={eqImg}
          style={{
            aspectRatio: "400/300",
            objectFit: "cover",
          }}
          width={400}
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{eqName}</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
              {eqDesc}
          </p>
          <div className="flex items-center justify-between">
              <span className={ `${eqStock === 0 && 'text-red-500' || eqStock > 5 && 'text-green-500' || 'text-yellow-500' } flex flex-row font-medium text-sm`}>{ eqStock == 0 && "Out of Stock" ||  eqStock <= 5 && "Limited Stock" || "In Stock"} 
                {
                  (eqStock > 0 && eqStock < 5)
                    ? <p className='ml-1 text-gray-400'>({eqStock} left)</p>
                    : null
                }
              </span>
              <div className="flex items-center gap-2">
                <Button { ...eqStock == 0 && { disabled: true } } className="bg-[#9B151E] hover:bg-[#9B151E]/90 text-white " size="sm" onClick={handleDecrement}>
                  -
                </Button>
                <span className="text-gray-900 dark:text-gray-50 font-medium">{currentQuantity}</span>
                <Button { ...eqStock == 0 && { disabled: true } } className="bg-[#9B151E] hover:bg-[#9B151E]/90 text-white" size="sm" onClick={handleIncrement}>
                  +
                </Button>
              </div>
          </div>
        </div>
    </div>
  );
};

export default EquipmentCard
