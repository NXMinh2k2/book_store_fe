import React, { useEffect, useState } from "react";
import {
  useEditBookMutation,
  useGetCategoriesQuery,
} from "@/redux/features/books.slice";

export interface updateBook {
  _id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  category: string;
  image: unknown;
}

const ModalEdit = ({ onClose, book, categories }: any) => {
  const [avatar, setAvatar] = useState("");
  const [editBook] = useEditBookMutation();

  const [updateBook, setUpdateBook] = useState<updateBook>({
    _id: book._id,
    title: book.title,
    author: book.author,
    price: book.price,
    description: book.description,
    category: book.category,
    image: book.image,
  });

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const image = await convertFileToBase64(file);

        const ObjectUrl = URL.createObjectURL(file);
        setAvatar(ObjectUrl);
        setUpdateBook({ ...updateBook, image });
      } catch (error) {
        console.error("Error converting file to Base64:", error);
      }
    }
  };

  const convertFileToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(",")[1]); // Extract the base64 string without the data URL prefix
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleEdit = async (updateBook: any) => {
    editBook(updateBook);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <span className="text-2xl font-bold mb-4">Create Book</span>
        <form>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-600"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={updateBook.title}
              onChange={(e) =>
                setUpdateBook({ ...updateBook, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-semibold text-gray-600"
            >
              Image
            </label>
            <input
              type="file"
              id="avatar"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-md"
            />
            <img src={avatar} alt="" />
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-semibold text-gray-600"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              value={updateBook.author}
              onChange={(e) =>
                setUpdateBook({ ...updateBook, author: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="des"
              className="block text-sm font-semibold text-gray-600"
            >
              Description
            </label>
            <input
              type="text"
              id="des"
              value={updateBook.description}
              onChange={(e) =>
                setUpdateBook({ ...updateBook, description: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-gray-600"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              value={updateBook.price}
              onChange={(e) =>
                setUpdateBook({ ...updateBook, price: +e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-600"
            >
              Category:
            </label>
            <select
              id="category"
              value={updateBook.category}
              onChange={(e) =>
                setUpdateBook({ ...updateBook, category: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            >
              {categories &&
                categories.map((category: any) => (
                  <option key={category._id} value={category.title}>
                    {category.title}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => handleEdit(updateBook)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit Book
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 text-gray-600 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEdit;
