import Image from "next/image";
import React from "react";
import Right from "../icons/Right";
import DoubleRight from "../icons/DoubleRight";

const Hero = () => {
  return (
    <section className="hero mt-8">
      <div className="py-12">
        <h1 className="text-4xl font-semibold leading-normal">
          Everything <br />
          is better <br />
          with a <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500">
          One Pizza a day keeps depression away, a simple yet delicious joy in
          life.
        </p>
        <div className="flex gap-4">
          <button className="bg-primary flex gap-2 text-white px-4 py-2 rounded-full">
            Order Now
            <Right />
          </button>
          <button className="flex gap-2 items-center text-gray-600 font-semibold">
            Learn more
            <DoubleRight />
          </button>
        </div>
      </div>

      <div className="relative">
        <Image
          src={"/pizza.jpg"}
          alt={"pizza"}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
          priority={true}
          quality={100}
        />
      </div>
    </section>
  );
};

export default Hero;
