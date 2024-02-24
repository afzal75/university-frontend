import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParam } from "../../../types";


export type TTableData = Pick<TAcademicSemester, "name" | "year" | "startMonth" | "endMonth">

const RegisteredSemester = () => {
    const [params, setParams] = useState<TQueryParam[] | undefined>(undefined)

    const { data: semesterData, isLoading, isFetching } = useGetAllSemestersQuery(params)

    const tableData = semesterData?.data?.map(({ _id, name, startMonth, endMonth, year }) => ({
        key: _id,
        name,
        startMonth,
        endMonth,
        year
    }))


    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
        },
        {
            title: 'Action',
            dataIndex: 'X',
            render: () => {
                return (
                    <div><Button>Update</Button></div>
                )
            }
        },
    ];

    const onChange: TableProps<TTableData>['onChange'] = (_pagination, filters, _sorter, extra) => {
        if (extra.action === "filter") {
            const queryParams: TQueryParam[] = [];

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

export default RegisteredSemester;