import { Button, Modal, Table } from 'antd';
import { useAddFacultiesMutation, useGetAllCoursesQuery } from '../../../redux/features/admin/courseManagement.api';
import { TCourse } from '../../../types/studentCourse.type';
import { useState } from 'react';
import PHForms from '../../../components/form/PHForms';
import PHSelect from '../../../components/form/PHSelect';
import { useGetAllFacultiesQuery } from '../../../redux/features/admin/userManagement.api';

export type TTableData = Pick<TCourse, 'title' | 'code' | 'credits' | 'prefix'>;



const Courses = () => {

    const { data: courses, isFetching } =
        useGetAllCoursesQuery(undefined);
    console.log(courses)

    const tableData = courses?.data?.map(
        ({ title, code, _id, prefix }: TCourse) => ({
            key: _id,
            title,
            code: `${prefix}${code}`,
        })
    );

    const columns = [
        {
            title: 'Title',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Code',
            key: 'code',
            dataIndex: 'code',
        },
        {
            title: 'Action',
            key: 'x',
            render: (item) => {
                return (
                    <AddFacultyModal facultyInfo={item} />
                );
            },
        },
    ];

    return (
        <Table
            loading={isFetching}
            columns={columns}
            dataSource={tableData}
        />
    );
};


const AddFacultyModal = ({ facultyInfo }) => {
    console.log(facultyInfo.key)
    const [addFaculties] = useAddFacultiesMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: facultiesData } = useGetAllFacultiesQuery(undefined)
    console.log(facultiesData)
    const facultiesOptions = facultiesData?.data?.map((item) => ({
        value: item._id,
        label: item.fullName
    }))

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (data) => {
        const facultiesData = {
            courseId: facultyInfo.key,
            data,
        }
        console.log(facultiesData)
        addFaculties(facultiesData)
    }
    return (
        <>
            <Button onClick={showModal}>
                Add Faculty
            </Button>
            <Modal
                footer={null}
                title="Basic Modal"
                open={isModalOpen}
                onCancel={handleCancel}
            >
                <PHForms onSubmit={handleSubmit}>
                    <PHSelect
                        mode='multiple'
                        options={facultiesOptions}
                        name='faculties'
                        label='Faculty'
                    />
                    <Button htmlType='submit'>Submit</Button>
                </PHForms>
            </Modal>
        </>
    )
}



export default Courses;
