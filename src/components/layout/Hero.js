import Image from "next/image";
import React from "react";
import Right from "../icons/Right";
import DoubleRight from "../icons/DoubleRight";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="grid md:grid-cols-2 md:mt-16 mt-8">
      <div className="md:py-24 py-8">
        <h1 className="text-4xl font-semibold leading-normal">
          Try <span className="text-primary">something new</span> <br />
          every day at <br />
          <span className="text-primary">The Culinary Corner</span>
        </h1>
        <p className="my-6 text-gray-500">
          From familiar comfort to exotic delights, our diverse menu has
          something for everyone.
        </p>

        <div className="flex gap-4">
          <Link
            href="/menu"
            className=" bg-primary flex gap-2 button text-white px-4 py-2 rounded-full"
          >
            <span className="flex text-white">
              Order Now
              <Right />
            </span>
          </Link>
          <button className="flex gap-2 items-center text-gray-600 font-semibold">
            Learn more
            <DoubleRight />
          </button>
        </div>
      </div>
      <div className="hidden md:block relative w-full h-full">
        <Image
          className=""
          src={"/pizzer.png"}
          alt="pizza"
          layout="fill"
          style={{ transform: "scaleX(-1)" }}
        />
      </div>
    </section>
  );
};

export default Hero;
