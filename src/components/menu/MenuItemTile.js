import AddToCartButton from "./AddToCartButton";

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, sizes, extraIngridientPrices } =
    item;
  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngridientPrices?.length > 0;

  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        <img src={image} alt="pizza" className=" max-h-20 block mx-auto" />
      </div>

      <h4 className="text-xl font-semibold my-3">{name}</h4>
      <p className="text-sm text-gray-500 line-clamp-3">{description}</p>
      <AddToCartButton
        image={image}
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
      />
    </div>
  );
}
