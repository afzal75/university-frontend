import { Button, Col, Row } from "antd";
import PHForms from "../../../components/form/PHForms";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { useAddAcademicDepartmentMutation, useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";


const CreateAcademicDepartment = () => {
    const [addAcademicDepartment] = useAddAcademicDepartmentMutation()
    const { data: academicFaculty } = useGetAcademicFacultiesQuery(undefined)
    console.log(academicFaculty)

    const academicFacultyOptions = academicFaculty?.data?.map((item) => ({
        value: item._id,
        label: item.name,
    }))

    const handleSubmit = async (data) => {
        const toastId = toast.loading("Creating.....")
        const academicDepartmentData = {
            ...data,
        }
        console.log(academicDepartmentData)
        try {
            const res = await addAcademicDepartment(academicDepartmentData) as TResponse<any>
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
        <Row>
            <Col span={8}>
                <PHForms onSubmit={handleSubmit}>
                    <PHInput type="text" name="name" label="Department" />
                    <PHSelect
                        options={academicFacultyOptions}
                        name="academicFaculty"
                        label="Academic Faculty"
                    />
                    <Button htmlType="submit">Submit</Button>
                </PHForms>
            </Col>
        </Row>
    );
};

export default CreateAcademicDepartment;