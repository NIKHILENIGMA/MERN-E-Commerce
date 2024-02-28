import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constant";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),

    profile: builder.query({
      query: (data) => ({
        url:`${USERS_URL}/current-user`,
        method: "GET",
        body
      })
    })
  }),
});

export const { 
  useLoginMutation, 
  useLogoutMutation,
  useRegisterMutation,


} = userApiSlice;
