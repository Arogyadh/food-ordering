"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { set } from "mongoose";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DeleteButton from "../../components/DeleteButton";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const { status, isAdmin } = useProfile();
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCatgories();
  }, []);

  function fetchCatgories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  if (status === "loading" || isAdmin === null) {
    return "Loading...";
  }

  if (isAdmin === false) {
    return "Not an admin.";
  }

  async function handleCategorySubmit(e) {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (selectedCategory) {
        data._id = selectedCategory._id;
      }
      const response = await fetch("/api/categories", {
        body: JSON.stringify(data),
        method: selectedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
      });
      setCategoryName("");
      fetchCatgories();
      setSelectedCategory(null);
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(creationPromise, {
      loading: selectedCategory
        ? "Updating Category..."
        : "Creating Category...",
      success: selectedCategory ? (
        <b>Category Updated</b>
      ) : (
        <b>Category Created!</b>
      ),
      error: <b>Could not create.</b>,
    });
  }

  async function handleDeleteCategory(_id) {
    const deletePromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories", {
        body: JSON.stringify({ _id }),
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();

      if (result.success) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(deletePromise, {
      loading: "Deleting Category...",
      success: <b>Category Deleted...</b>,
      error: <b>Error.</b>,
    });
    fetchCatgories();
    setSelectedCategory(null);
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={isAdmin} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end ">
          <div className="grow">
            <label>
              {selectedCategory ? "Edit" : "Create"} Category:{" "}
              {selectedCategory && <b>{selectedCategory.name}</b>}
            </label>
            <input
              placeholder="Type here."
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="pb-[10px] flex gap-2">
            <button type="submit">{selectedCategory ? "Update" : "+"}</button>
            {selectedCategory && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setCategoryName("");
                }}
                type="button"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
      <div>
        <span className="flex text-gray-500 justify-center p-4">
          Existing categories:
        </span>
        {categories?.length > 0 &&
          categories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-xl p-2 mb-2 flex  items-center"
            >
              <div className="text-gray-700  grow">{category.name}</div>
              <div className="flex gap-1 items-center">
                <div>
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setCategoryName(category.name);
                    }}
                    type="button"
                  >
                    Edit
                  </button>
                </div>
                <div className="mb-2">
                  <DeleteButton
                    label="Delete"
                    onDelete={() => {
                      handleDeleteCategory(category._id);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
