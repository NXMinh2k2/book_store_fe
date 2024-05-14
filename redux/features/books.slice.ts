import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Book {
  _id: string;
  title: string;
  image: string;
  author: string;
  price: number;
  description: string;
  category: string;
}

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/books/categories",
    }),
    getBooks: builder.query({
      query: () => "/books",
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
    }),
    editBook: builder.mutation({
      query: (updateBook) => ({
        url: `books/${updateBook._id}`,
        method: "PUT",
        body: updateBook,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetBooksQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useEditBookMutation,
} = apiSlice;
