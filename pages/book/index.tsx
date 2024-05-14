import { Book } from "@/redux/features/book.slice";
import React from "react";
import { useGetBooksQuery } from "@/redux/features/books.slice";

const ListBook = () => {
  const { data: books, isLoading } = useGetBooksQuery("getBooks");

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Book List</h1>
        <ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          id="bookList"
        >
          {!isLoading &&
            books.map((book: Book, index: number) => {
              return (
                <li key={index}>
                  <div className="flex flex-col  border-black border-2 items-center">
                    <span>{book.title}</span>
                    <span>{book.category}</span>
                    <span>{book.description}</span>
                    <span>{book.author}</span>
                    <img src={book.image} alt="" />
                    <span>Price: {book.price} $</span>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default ListBook;
