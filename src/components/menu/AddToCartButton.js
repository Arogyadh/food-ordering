// import FlyingButton from "react-flying-item";
export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
}) {
  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent mt-4">
        <button onClick={onClick}> Rs. {basePrice}</button>
      </div>
    );
  }
  return (
    <>
      <button
        type="button"
        className=" mt-4 bg-primary rounded-full text-white px-8 py-2"
        onClick={onClick}
      >
        <span className="text-sm">From Rs.{basePrice} </span>
      </button>
    </>
  );
}
