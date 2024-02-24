import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import PHForms from "../../../components/form/PHForms";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";




const SemesterRegistration = () => {

    const [addSemesterRegistration] = useAddRegisteredSemesterMutation()

    const { data: academicSemester, isLoading } = useGetAllSemestersQuery([
        { name: "sort", value: "year" }
    ])
    console.log(academicSemester)

    const academicSemesterOptions = academicSemester?.data?.map((item) => ({
        value: item._id,
        label: `${item.name} ${item.year}`
    }))



    const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {

        const toastId = toast.loading("Creating.....")


        const semesterData = {
            ...data,
            minCredit: Number(data.minCredit),
            maxCredit: Number(data.maxCredit),
        }

        console.log(semesterData)
        try {
            const res = await addSemesterRegistration(semesterData) as TResponse<any>
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
                    <PHSelect
                        label="Academic Semester"
                        name="academicSemester"
                        options={academicSemesterOptions}>
                    </PHSelect>
                    <PHSelect
                        name="status"
                        label="status"
                        options={semesterStatusOptions}>
                    </PHSelect>
                    <PHDatePicker name="startDate" label="Start Date" />
                    <PHDatePicker name="endDate" label="End Date" />
                    <PHInput type="text" name="minCredit" label="Min Credit" />
                    <PHInput type="text" name="maxCredit" label="Max Credit" />
                    <Button htmlType="submit">Submit</Button>
                </PHForms>
            </Col>
        </Flex>
    );
};

export default SemesterRegistration;