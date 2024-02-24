/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForms from "../../../components/form/PHForms";
import { Button, Col, Flex } from "antd";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import { useAddCoursesMutation, useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import PHSelect from "../../../components/form/PHSelect";
import { TResponse } from "../../../types";




const CreateCourse = () => {

    const [addCourses] = useAddCoursesMutation()
    const { data: courses } = useGetAllCoursesQuery(undefined);

    const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
        value: item._id,
        label: item.title,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...');

        const courseData = {
            ...data,
            isDeleted: false,
            code: Number(data.code),
            credits: Number(data.credits),
            preRequisiteCourses: data?.preRequisiteCourses?.map((item) => ({
                course: item,
                isDeleted: false,
            }))
        };

        console.log(courseData);
        try {
            const res = await addCourses(courseData) as TResponse<any>
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId })
            }
            else {
                toast.success("Semester Created Successfully", { id: toastId })
            }
            console.log(res)
        }
        catch (err) {
            toast.error("Something went wrong", { id: toastId })
        }
    }


    return (
        <Flex justify="center" align="center">
            <Col span={6}>
                <PHForms onSubmit={onSubmit}>
                    <PHInput type="text" name="title" label="Title" />
                    <PHInput type="text" name="prefix" label="Prefix" />
                    <PHInput type="text" name="code" label="Code" />
                    <PHInput type="text" name="credits" label="Credits" />
                    <PHSelect
                        mode="multiple"
                        name="preRequisiteCourses"
                        label="Pre Requisite Course"
                        options={preRequisiteCoursesOptions}
                    />
                    <Button htmlType="submit">Submit</Button>
                </PHForms>
            </Col>
        </Flex>
    );
};

export default CreateCourse;












// import { FieldValues, SubmitHandler } from 'react-hook-form';
// // import PHForm from '../../../components/form/PHForm';
// import { Button, Col, Flex } from 'antd';
// import PHSelect from '../../../components/form/PHSelect';
// import { toast } from 'sonner';
// import PHInput from '../../../components/form/PHInput';

// import { TResponse } from '../../../types';
// import { useGetAllCoursesQuery } from '../../../redux/features/admin/courseManagement.api';
// import PHForms from '../../../components/form/PHForms';

// const CreateCourse = () => {
//     // const [createCourse] = useAddCourseMutation();
//     const { data: courses } = useGetAllCoursesQuery(undefined);

//     const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
//         value: item._id,
//         label: item.title,
//     }));

//     const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//         const toastId = toast.loading('Creating...');

//         const courseData = {
//             ...data,
//             code: Number(data.code),
//             credits: Number(data.credits),
//             isDeleted: false,
//             preRequisiteCourses: data.preRequisiteCourses
//                 ? data.preRequisiteCourses?.map((item) => ({
//                     course: item,
//                     isDeleted: false,
//                 }))
//                 : [],
//         };

//         console.log(courseData);

//         // try {
//         //     const res = (await createCourse(courseData)) as TResponse<any>;
//         //     console.log(res);
//         //     if (res.error) {
//         //         toast.error(res.error.data.message, { id: toastId });
//         //     } else {
//         //         toast.success('Semester created', { id: toastId });
//         //     }
//         // } catch (err) {
//         //     toast.error('Something went wrong', { id: toastId });
//         // }
//     };

//     return (
//         <Flex justify="center" align="center">
//             <Col span={6}>
//                 <PHForms onSubmit={onSubmit}>
//                     <PHInput type="text" name="title" label="Title" />
//                     <PHInput type="text" name="prefix" label="Prefix" />
//                     <PHInput type="text" name="code" label="Code" />
//                     <PHInput type="text" name="credits" label="Credits" />
//                     <PHSelect
//                         mode="multiple"
//                         options={preRequisiteCoursesOptions}
//                         name="preRequisiteCourses"
//                         label="preRequisiteCourses"
//                     />
//                     <Button htmlType="submit">Submit</Button>
//                 </PHForms>
//             </Col>
//         </Flex>
//     );
// };

// export default CreateCourse;
