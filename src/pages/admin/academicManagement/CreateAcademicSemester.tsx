import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import PHForms from "../../../components/form/PHForms";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schemas";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";


// const nameOptions = [
//     {
//         value: "01",
//         label: "Autumn"
//     },
//     {
//         value: "02",
//         label: "Summer"
//     },
//     {
//         value: "03",
//         label: "Fall"
//     },
// ]

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map(number => ({
    value: String(currentYear + number),
    label: String(currentYear + number)
}))
console.log(yearOptions)

const CreateAcademicSemester = () => {

    const [addAcademicSemester] = useAddAcademicSemesterMutation()


    const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {

        const toastId = toast.loading("Creating.....")

        const name = semesterOptions[Number(data?.name) - 1]?.label;

        const semesterData = {
            name,
            code: data.name,
            year: data.year,
            startMonth: data.startMonth,
            endMonth: data.endMonth
        }
        try {
            const res = await addAcademicSemester(semesterData) as TResponse
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
                <PHForms onSubmit={onSubmit}
                    resolver={zodResolver(academicSemesterSchema)}>
                    <PHSelect
                        label="Name"
                        name="name"
                        options={semesterOptions}>
                    </PHSelect>
                    <PHSelect
                        label="Year"
                        name="year"
                        options={yearOptions}>
                    </PHSelect>
                    <PHSelect
                        label="Start Month"
                        name="startMonth"
                        options={monthOptions}>
                    </PHSelect>
                    <PHSelect
                        label="End Month"
                        name="endMonth"
                        options={monthOptions}>
                    </PHSelect>
                    <Button htmlType="submit">Submit</Button>
                </PHForms>
            </Col>
        </Flex>
    );
};

export default CreateAcademicSemester;