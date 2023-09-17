import React from "react";

import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product?.id}`)}
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3"
    >
      <div className="h-[13rem] w-[10rem]">
        <img
          className="object-cover object-top w-full h-full"
          src={product?.image || product?.imageUrl}
          alt={product?.title}
        />
      </div>

      <div className="p-4 ">
        <h3 className="text-lg font-medium text-gray-900">
              {product?.title}
        </h3>
        <p className="mt-2 text-sm text-gray-500">{product?.brand || product?.title}</p>
        <div className='flex space-x-2 items-center'>
            <p className='text-red-600 font-bold'>${product?.discountedPrice}</p>
            {
              product?.discountedPrice !== product?.price && product?.price !== 0 && (
                <p className='opacity-50 line-through'>${product?.price}</p>
              )
            }
            {
              product?.discountPersent !== 0 && (
                <p className='text-green-600 font-semibold'>{product?.discountPersent}% off</p>
              )
            }
        </div>
      </div>
    </div>
  );
};

export default HomeProductCard;
