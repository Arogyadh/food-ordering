import { useState } from "react";
import EditableImage from "./EditableImage";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngridientPrices, setExtraIngridientPrices] = useState(
    menuItem?.extraIngridientPrices || []
  );

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraIngridientPrices,
        })
      }
      className="mt-8 max-w-md mx-auto"
    >
      <div className="flex items-start gap-4">
        <div className=" rounded-md max-w-[200px] max-h-[100px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Base Price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
          />
          <MenuItemPriceProps
            name={"Sizes/Extra"}
            addLabel={"Add Sizes"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Extra ingridients"}
            addLabel={"Add ingridient prices"}
            props={extraIngridientPrices}
            setProps={setExtraIngridientPrices}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
