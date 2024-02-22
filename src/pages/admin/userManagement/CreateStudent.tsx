import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForms from "../../../components/form/PHForms";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Row } from "antd";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useGetAcademicDepartmentsQuery, useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";

const studentDummyData = {
    "password": "student123",
    "student": {
        "name": {
            "firstName": "I am ",
            "middleName": "Student",
            "lastName": "Number 1"
        },
        "gender": "male",
        "dateOfBirth": "1990-01-01",
        "email": "student2@gmail.com",
        "contactNo": "1235678",
        "emergencyContactNo": "987-654-3210",
        "bloogGroup": "A+",
        "presentAddress": "123 Main St, Cityville",
        "permanentAddress": "456 Oak St, Townsville",
        "guardian": {
            "fatherName": "James Doe",
            "fatherOccupation": "Engineer",
            "fatherContactNo": "111-222-3333",
            "motherName": "Mary Doe",
            "motherOccupation": "Teacher",
            "motherContactNo": "444-555-6666"
        },
        "localGuardian": {
            "name": "Alice Johnson",
            "occupation": "Doctor",
            "contactNo": "777-888-9999",
            "address": "789 Pine St, Villageton"
        },
        "admissionSemester": "65b0104110b74fcbd7a25d92",
        "academicDepartment": "65b00fb010b74fcbd7a25d8e"
    }
}

// ! this only for development
// ! should be removed


const studentDefaultValues = {
    "name": {
        "firstName": "I am ",
        "middleName": "Student",
        "lastName": "Number 1"
    },
    "gender": "male",
    // ! "dateOfBirth": "1990-01-01",
    "email": "student2222@gmail.com",
    "contactNo": "1235678",
    "emergencyContactNo": "987-654-3210",
    "bloogGroup": "A+",
    "presentAddress": "123 Main St, Cityville",
    "permanentAddress": "456 Oak St, Townsville",
    "guardian": {
        "fatherName": "James Doe",
        "fatherOccupation": "Engineer",
        "fatherContactNo": "111-222-3333",
        "motherName": "Mary Doe",
        "motherOccupation": "Teacher",
        "motherContactNo": "444-555-6666"
    },
    "localGuardian": {
        "name": "Alice Johnson",
        "occupation": "Doctor",
        "contactNo": "777-888-9999",
        "address": "789 Pine St, Villageton"
    },
    // !"admissionSemester": "65b0104110b74fcbd7a25d92",
    // *"academicDepartment": "65b00fb010b74fcbd7a25d8e"
}



const CreateStudent = () => {
    const [addStudent, { data, error }] = useAddStudentMutation()
    console.log({ data, error })
    const { data: sData, isLoading: sIsLoading } = useGetAllSemestersQuery(undefined);
    // console.log(sData?.data)

    const semesterOptions = sData?.data?.map((item) => ({
        value: item._id,
        label: `${item.name} ${item.year}`
    }))

    // all department

    const { data: dData, isLoading: dIsLoading } = useGetAcademicDepartmentsQuery(undefined, { skip: sIsLoading })

    const departmentOptions = dData?.data?.map((item) => ({
        value: item._id,
        label: item.name
    }))
    console.log(dData)



    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const studentData = {
            password: "student123",
            student: data
        }

        const formData = new FormData()
        formData.append("data", JSON.stringify(studentData))
        addStudent(formData)

        // // ! This is for development
        // // ! Just for checking
        // console.log(Object.fromEntries(formData))
    }
    return (
        <div>
            <Row>
                <Col span={24}>
                    <PHForms onSubmit={onSubmit}
                        defaultValues={studentDefaultValues}>
                        <Divider>Personal Info</Divider>
                        <Row gutter={8}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="name.firstName"
                                    label="First Name" />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="name.middleName"
                                    label="Middle Name" />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="name.lastName"
                                    label="Last Name" />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHSelect

                                    name="gender"
                                    options={genderOptions}
                                    label="Gender" />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHDatePicker
                                    name="dateOfBirth"
                                    label="Date Of Birth" />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHSelect
                                    name="bloogGroup"
                                    label="BloodGroup"
                                    options={bloodGroupOptions}
                                />
                            </Col>
                            <Divider>Contact Info.</Divider>
                            <Row gutter={8}>
                                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                    <PHInput type="text" name="email" label="Email" />
                                </Col>
                                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                    <PHInput type="text" name="contactNo" label="Contact" />
                                </Col>
                                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                    <PHInput
                                        type="text"
                                        name="emergencyContactNo"
                                        label="Emergency Contact"
                                    />
                                </Col>
                                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                    <PHInput
                                        type="text"
                                        name="presentAddress"
                                        label="Present Address"
                                    />
                                </Col>
                                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                    <PHInput
                                        type="text"
                                        name="permanentAddress"
                                        label="Permanent Address"
                                    />
                                </Col>
                            </Row>
                            <Divider>Guardian</Divider>
                            <Row gutter={8}>
                                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                    <PHInput
                                        type="text"
                                        name="guardian.fatherName"
                                        label="Father Name"
                                    />
                                </Col>
                                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                    <PHInput
                                        type="text"
                                        name="guardian.fatherOccupation"
                                        label="Father Occupation"
                                    />
                                </Col>
                                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                    <PHInput
                                        type="text"
                                        name="guardian.fatherContactNo"
                                        label="Father ContactNo"
                                    />
                                </Col>
                                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                    <PHInput
                                        type="text"
                                        name="guardian.motherName"
                                        label="Mother Name"
                                    />
                                </Col>
                                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                    <PHInput
                                        type="text"
                                        name="guardian.motherOccupation"
                                        label="Mother Occupation"
                                    />
                                </Col>
                                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                    <PHInput
                                        type="text"
                                        name="guardian.motherContactNo"
                                        label="Mother ContactNo"
                                    />
                                </Col>
                            </Row>
                            <Divider>Local Guardian</Divider>
                            <Row gutter={8}>
                                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                    <PHInput type="text" name="localGuardian.name" label="Name" />
                                </Col>
                                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                    <PHInput
                                        type="text"
                                        name="localGuardian.occupation"
                                        label="Occupation"
                                    />
                                </Col>
                                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                    <PHInput
                                        type="text"
                                        name="localGuardian.contactNo"
                                        label="Contact No."
                                    />
                                </Col>
                                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                    <PHInput
                                        type="text"
                                        name="localGuardian.address"
                                        label="Address"
                                    />
                                </Col>
                            </Row>
                        </Row>
                        <Divider>Academic Info.</Divider>
                        <Row gutter={8}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHSelect
                                    options={semesterOptions}
                                    disabled={sIsLoading}
                                    name="admissionSemester"
                                    label="Admission Semester"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHSelect
                                    options={departmentOptions}
                                    disabled={dIsLoading}
                                    name="academicDepartment"
                                    label="Admission Department"
                                />
                            </Col>
                        </Row>
                        <Button htmlType="submit">Submit</Button>
                    </PHForms>
                </Col>
            </Row>
        </div>
    );
};

export default CreateStudent;