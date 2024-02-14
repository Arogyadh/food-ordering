import FlyingButton from "react-flying-item";
export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
  image,
}) {
  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent mt-4">
        <FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}>
          <div onClick={onClick}> Rs. {basePrice}</div>
        </FlyingButton>
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
        <span className="text-md">From Rs.{basePrice} </span>
      </button>
    </>
  );
}
