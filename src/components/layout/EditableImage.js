import Image from "next/image";
import { toast } from "react-hot-toast";

export default function EditableImage({ link, setLink }) {
  async function handleFileChange(ev) {
    const files = ev?.target?.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadingPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });

        if (response.ok) {
          const link = await response.json();
          setLink(link);
          resolve();
          console.log("Uploaded Successfully.");
        } else {
          reject();
          console.log("Upload Failed.");
        }
      });
      await toast.promise(uploadingPromise, {
        loading: "Uploading...",
        success: <b>Image uploaded!</b>,
        error: <b>Could not upload.</b>,
      });
    }
  }
  return (
    <>
      {link && (
        <Image
          className="rounded-md mb-2 border-black hover:border-[1px] "
          src={link}
          alt="profile picture"
          width={100}
          height={100}
        />
      )}
      {!link && (
        <div className="bg-gray-200 text-gray-500 rounded-xl p-4 mb-1">
          No Image
        </div>
      )}

      <label>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <span className="block border border-gray-300 cursor-pointer hover:bg-gray-200 text-center rounded-lg p-2">
          Edit
        </span>
      </label>
    </>
  );
}
