import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Login {
  email: string;
  password: string;
}

export interface Signup {
  name: string;
  email: string;
  password: string;
}

export const authSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const { useLoginMutation } = authSlice;
