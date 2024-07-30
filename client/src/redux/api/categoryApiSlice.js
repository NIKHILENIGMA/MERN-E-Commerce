import { apiSlice } from './apiSlice';
import { CATEGORY_URL } from '../constant';


export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        /// Add a category 
        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: `${CATEGORY_URL}/add`,
                method: 'POST',
                body: newCategory,
            })
        }),
        
        /// Update a existing category 
        updateCategory: builder.mutation({
            query: ({ id, updatedCategory }) => ({
                url: `${CATEGORY_URL}/${id}`,
                method: 'PATCH',
                body: updatedCategory,
            })
        }),
        
        /// Delete a existing category 
        deleteCategory: builder.mutation({
            query: ({id}) => ({
                url: `${CATEGORY_URL}/${id}`,
                method: 'DELETE',
    
            })
        }),

        /// Get a Category 
        allCategory: builder.query({
            query: () => ({
                url: `${CATEGORY_URL}/`,
                method: 'GET',
                
            })
        }),

        getCategory: builder.query({
            query: ({id}) => ({
                url: `${CATEGORY_URL}/${id}`,
                method: 'GET',
                
            }),
        }),

    }),
});

export const {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoryQuery,
    useAllCategoryQuery,
} = categoryApiSlice