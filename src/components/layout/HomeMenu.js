"use client";

import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function HomeMenu() {
  const [loading, setLoading] = useState(true);
  const [bestSellers, setBestSellers] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleCarouselClick() {
    window.location.href = "/menu";

    return false;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  useEffect(() => {
    fetch("/api/menu-items").then((response) => {
      response.json().then((menuItems) => {
        setBestSellers(menuItems.slice(-6));
      });
    });
    setLoading(false);
  }, []);
  return (
    <section>
      <div className="text-center  mt-20 mb-8">
        <SectionHeaders
          subHeader={"Check Out"}
          mainHeader={"Our New Additions"}
        />
      </div>
      {loading && <div className="text-center ">Loading...</div>}
      <div className=" w-full">
        <Slider {...settings}>
          {bestSellers?.length > 0 &&
            bestSellers.map((item) => (
              <div key={item._id} onClick={handleCarouselClick}>
                <MenuItem key={item._id} {...item} />
              </div>
            ))}
        </Slider>
      </div>
    </section>
  );
}
