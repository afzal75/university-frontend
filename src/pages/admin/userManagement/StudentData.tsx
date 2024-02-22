import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TQueryParam, TStudent } from "../../../types";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";


export type TTableData = Pick<TStudent, "name" | "id">

const StudentData = () => {
    const [params, setParams] = useState<TQueryParam[] | undefined>(undefined)

    const { data: semesterData, isLoading, isFetching } = useGetAllStudentsQuery(params)

    const tableData = semesterData?.data?.map(({ _id, fullName, id }) => ({
        key: _id,
        fullName,
        id
    }))


    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Name',
            dataIndex: 'fullName',
            filters: [
                {
                    text: 'Autumn',
                    value: 'Autumn',
                },
                {
                    text: 'Fall',
                    value: 'Fall',
                },
                {
                    text: 'Summer',
                    value: 'Summer',
                },
            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Roll No.',
            key: "id",
            dataIndex: 'id',
        },
        {
            title: 'Action',
            dataIndex: 'X',
            render: () => {
                return (
                    <Space>
                        <Button>Update</Button>
                        <Button>Details</Button>
                        <Button>Block</Button>
                    </Space>
                )
            },
            width: "1%"
        },
    ];

    const onChange: TableProps<TTableData>['onChange'] = (_pagination, filters, _sorter, extra) => {
        if (extra.action === "filter") {
            const queryParams: TQueryParam[] = [];

            filters.name?.forEach((item) =>
                queryParams.push({ name: "name", value: item })
            )
            setParams(queryParams)
        }
    };

    console.log(semesterData)
    if (isLoading) {
        return <p>Loading........</p>
    }
    return (
        <div>
            <Table
                columns={columns}
                dataSource={tableData}
                onChange={onChange}
                loading={isFetching}
            />
        </div>
    );
};

export default StudentData;