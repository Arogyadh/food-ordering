import { useState } from "react";

export default function DeleteButton({ label, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/80">
        <div className="bg-white p-4 rounded-lg">
          <div className="text-sm text-gray-600 mt-1">
            Are you sure you want to delete this?
          </div>
          <div className="mt-2 flex gap-2">
            <button type="button" onClick={() => setShowConfirm(false)}>
              Cancel
            </button>
            <button
              type="button"
              className="bg-primary text-white"
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
            >
              Yes,&nbsp;delete!
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <button
      type="button"
      className="mt-2"
      onClick={() => {
        setShowConfirm(true);
      }}
    >
      {label}
    </button>
  );
}
