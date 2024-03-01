import React from "react";

const SectionHeaders = ({ subHeader, mainHeader }) => {
  return (
    <div>
      <h3 className="text-gray-500 uppercase font-semibold leading-3">
        {subHeader}
      </h3>
      <h2 className="md:text-primary  font-bold text-4xl ">{mainHeader}</h2>
    </div>
  );
};

export default SectionHeaders;
