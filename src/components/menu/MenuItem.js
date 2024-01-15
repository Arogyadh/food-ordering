import React from "react";

const MenuItem = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        <img src="/pizza.jpg" alt="pizza" className=" max-h-20 block mx-auto" />
      </div>

      <h4 className="text-xl font-semibold my-3">Pepperoni pizza</h4>
      <p className="text-sm text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <button className="mt-4 bg-primary rounded-full text-white px-8 py-2">
        Add to cart $12
      </button>
    </div>
  );
};

export default MenuItem;