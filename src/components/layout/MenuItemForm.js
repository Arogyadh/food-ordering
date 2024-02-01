import { useEffect, useState } from "react";

import EditableImage from "./EditableImage";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
import toast from "react-hot-toast";

async function DeleteMenuItem(_id, router) {
  const deleteMenuItemPromise = new Promise(async (resolve, reject) => {
    const response = await fetch("/api/menu-items", {
      method: "DELETE",
      body: JSON.stringify({ _id }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      resolve();
    } else {
      reject();
    }
    console.log(response);
  });
  await toast.promise(deleteMenuItemPromise, {
    loading: "Deleting...",
    success: <b>Menu Item Deleted!</b>,
    error: <b>Could not delete.</b>,
  });

  router.push("/menu-items");
}

export default function MenuItemForm({ router, onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngridientPrices, setExtraIngridientPrices] = useState(
    menuItem?.extraIngridientPrices || []
  );

  useEffect(() => {
    if (menuItem) {
      setImage(menuItem.image || "");
      setName(menuItem.name || "");
      setDescription(menuItem.description || "");
      setBasePrice(menuItem.basePrice || "");
      setSizes(menuItem.sizes || []);
      setExtraIngridientPrices(menuItem.extraIngridientPrices || []);
    }
  }, [menuItem]);

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

          <button
            onClick={() => {
              DeleteMenuItem(menuItem._id, router);
            }}
            className="mt-2"
            type="button"
          >
            Delete Menu Item
          </button>
        </div>
      </div>
    </form>
  );
}
