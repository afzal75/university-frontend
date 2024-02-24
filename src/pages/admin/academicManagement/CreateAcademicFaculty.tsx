/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row } from "antd";
import PHForms from "../../../components/form/PHForms";
import PHInput from "../../../components/form/PHInput";
import { useAddAcademicFacultiesMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";


const CreateAcademicFaculty = () => {
    const [addAFaculty] = useAddAcademicFacultiesMutation()




    const handleSubmit = async (data) => {
        const toastId = toast.loading("Creating.....")
        const addAcademicFacultyData = {
            name: data.name
        }
        try {
            const res = await addAFaculty(addAcademicFacultyData) as TResponse<any>
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
                    <PHInput type="text" name="name" label="Academic Faculty" />
                    <Button htmlType="submit">Submit</Button>
                </PHForms>
            </Col>
        </Row>
    );
};

export default CreateAcademicFaculty;