import React, { useState } from "react";
import Modal from "../book/model";
import ModalEdit from "../book/modelEdit";
import {
  Book,
  useDeleteBookMutation,
  useGetBooksQuery,
  useGetCategoriesQuery,
} from "@/redux/features/books.slice";

const index = () => {
  const { data: categories } = useGetCategoriesQuery("getCategories");
  const { data: books, isLoading, refetch } = useGetBooksQuery("getBooks");

  const [deleteBook] = useDeleteBookMutation();

  const [isModalOpen, setIsModal] = useState<boolean>(false);
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book>();

  const handleModal = () => {
    setIsModal(!isModalOpen);
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setIsModalEdit(!isModalEdit);
  };

  const handleDelete = async (id: string) => {
    await deleteBook(id);
    await refetch();
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-lg justify-center text-center">Manage Page</h1>
      <button
        className="bg-green-600 text-white p-2 rounded-md"
        onClick={handleModal}
      >
        Create +
      </button>
      <h1 className="text-3xl font-semibold mb-4">Book's Information</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-4">Title</th>
              <th className="border border-gray-300 p-4">Image</th>
              <th className="border border-gray-300 p-4">Category</th>
              <th className="border border-gray-300 p-4">Author</th>
              <th className="border border-gray-300 p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading === false &&
              books.map((book: Book) => {
                return (
                  <tr key={book._id}>
                    <td className="border border-gray-300 p-4">{book.title}</td>
                    <td className="border border-gray-300 p-4">
                      <img src={book.image} />
                    </td>
                    <td className="border border-gray-300 p-4">
                      {book.category}
                    </td>
                    <td className="border border-gray-300 p-4">
                      {book.author}
                    </td>
                    <td className="border border-gray-300 p-4">
                      <button
                        onClick={() => handleEdit(book)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                        onClick={() => handleDelete(book._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {isModalOpen && <Modal onClose={handleModal} />}
        {isModalEdit && (
          <ModalEdit
            onClose={handleEdit}
            book={selectedBook}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
};

export default index;
