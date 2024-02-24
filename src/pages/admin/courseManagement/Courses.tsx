import { Button, Table } from 'antd';
import { useGetAllCoursesQuery } from '../../../redux/features/admin/courseManagement.api';
import { TCourse } from '../../../types/studentCourse.type';

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
            // render: (item) => {
            //     let color;
            //     if (item === 'UPCOMING') {
            //         color = 'blue';
            //     }
            //     if (item === 'ONGOING') {
            //         color = 'green';
            //     }
            //     if (item === 'ENDED') {
            //         color = 'red';
            //     }

            //     return <Tag color={color}>{item}</Tag>;
            // },
        },
        {
            title: 'Action',
            key: 'x',
            render: () => {
                return (
                    <Button >Assign Faculties</Button>
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

export default Courses;
