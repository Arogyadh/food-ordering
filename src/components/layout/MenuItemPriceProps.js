import Trash from "@/components/icons/Trash";
import ChevronUp from "@/components/icons/ChevronUp";
import ChevronDown from "@/components/icons/ChevronDown";

import { useState } from "react";

export default function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}) {
  const [isOpen, setIsOpen] = useState(false);
  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }
  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2 ">
      <button
        className="p-2  border-0"
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span className="grow">
          {name}
          <span className="m-2">({props?.length})</span>
        </span>

        {isOpen && <ChevronUp />}
        {!isOpen && <ChevronDown />}
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((size, index) => (
            <div className="flex items-end gap-2" key={index}>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Size name"
                  value={size.name}
                  onChange={(ev) => editProp(ev, index, "name")}
                />
              </div>
              <div>
                <label>Extra Price</label>
                <input
                  type="text"
                  placeholder="Extra Price"
                  value={size.price}
                  onChange={(ev) => editProp(ev, index, "price")}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="bg-white mb-2 px-2"
                  onClick={() => {
                    removeProp(index);
                  }}
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button type="button" onClick={addProp} className="bg-white">
          {addLabel}
        </button>
      </div>
    </div>
  );
}
