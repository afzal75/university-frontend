import { TQueryParam, TResponseRedux, TSemester } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRegisteredSemester: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    });
                }

                return {
                    url: "/semester-registrations",
                    method: "GET",
                    params: params
                }
            },
            providesTags: ["semester"],
            transformResponse: (response: TResponseRedux<TSemester[]>) => {
                console.log(response)
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        getAllCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    });
                }

                return {
                    url: "/courses",
                    method: "GET",
                    params: params
                }
            },
            providesTags: ["semester"],
            transformResponse: (response: TResponseRedux<any>) => {
                console.log(response)
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        addCourses: builder.mutation({
            query: (data) => ({
                url: '/courses/create-course',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["semester"]
        }),
        addRegisteredSemester: builder.mutation({
            query: (data) => ({
                url: '/semester-registrations/create-semester-registration',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["semester"]
        }),
        updateRegisteredSemester: builder.mutation({
            query: (args) => ({
                url: `/semester-registrations/${args.id}`,
                method: 'PATCH',
                body: args.data,
            }),
            invalidatesTags: ["semester"]
        }),
    })
})

export const {
    useAddRegisteredSemesterMutation,
    useGetAllRegisteredSemesterQuery,
    useUpdateRegisteredSemesterMutation,
    useGetAllCoursesQuery,
    useAddCoursesMutation
} = courseManagementApi