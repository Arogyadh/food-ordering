import Image from "next/image";

export default function OrderStatus({ status }) {
  return (
    <div className="text-gray-500">
      <div className="flex items-center gap-5">
        <div className="h-20 w-20">
          <Image
            style={{ transform: "scaleX(-1)" }}
            src={
              status &&
              `https://arogya-ordering.s3.ap-southeast-1.amazonaws.com/${status}.png`
            }
            alt="delivering"
            height={100}
            width={100}
          />
        </div>
        Status:
        <span className="text-black font-semibold">
          {status && `${status.charAt(0).toUpperCase()}${status.slice(1)}`}
        </span>
        <div className="h-20 w-20">
          <Image
            src={
              status &&
              `https://arogya-ordering.s3.ap-southeast-1.amazonaws.com/${status}.png`
            }
            alt="delivering"
            height={100}
            width={100}
          />
        </div>
      </div>
    </div>
  );
}
