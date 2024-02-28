import Image from "next/image";
import { cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";

export default function CartProduct({ product, onRemove, index }) {
  return (
    <div className="flex flex-col md:grid md:grid-cols-4 gap-3 mb-2 border-b text-start items-center py-2">
      <div className="w-24">
        <Image
          src={product.image}
          alt={product.name}
          width={240}
          height={240}
          className="rounded-lg"
        />
      </div>

      <div>
        <h3 className="font-semibold">{product.name}</h3>
        {product?.size && (
          <span className="text-sm">Size: {product.size.name}</span>
        )}
        {product?.extras.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map((extra, index) => (
              <span key={index} className="flex text-start">
                {extra.name} Rs.{extra.price}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="text-center text-lg font-semibold">
        Rs.{cartProductPrice(product)}
      </div>
      {!!onRemove && (
        <div>
          <button type="button" onClick={() => onRemove(index)} className="p-2">
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
}
