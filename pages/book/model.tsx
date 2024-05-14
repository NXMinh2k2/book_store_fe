import React, { useEffect, useState } from "react";
import {
  useAddBookMutation,
  useGetBooksQuery,
  useGetCategoriesQuery,
} from "@/redux/features/books.slice";

export interface NewBook {
  title: string;
  author: string;
  price: number;
  description: string;
  category: string;
  image: unknown;
}

const Modal = ({ onClose }: any) => {
  const { data: books, refetch } = useGetBooksQuery("getBooks");

  const { data: categories, isLoading } =
    useGetCategoriesQuery("getCategories");
  const [addBook] = useAddBookMutation();

  const [avatar, setAvatar] = useState("");

  const [newBook, setNewBook] = useState<NewBook>({
    title: "",
    author: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  });

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const image = await convertFileToBase64(file);

        const ObjectUrl = URL.createObjectURL(file);
        setAvatar(ObjectUrl);
        setNewBook({ ...newBook, image });
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

  const handleAddBook = async () => {
    await addBook(newBook);
    await refetch();
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
              value={newBook.title}
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
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
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
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
              value={newBook.description}
              onChange={(e) =>
                setNewBook({ ...newBook, description: e.target.value })
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
              value={newBook.price}
              onChange={(e) =>
                setNewBook({ ...newBook, price: +e.target.value })
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
              value={newBook.category}
              onChange={(e) =>
                setNewBook({ ...newBook, category: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            >
              {!isLoading &&
                categories &&
                categories.length &&
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
              onClick={handleAddBook}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Book
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

export default Modal;
