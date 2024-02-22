import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParam } from "../../../types";


export type TTableData = Pick<TAcademicSemester, "name" | "year" | "startMonth" | "endMonth">

const AcademicSemester = () => {
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
            dataIndex: 'name',
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
            title: 'Year',
            dataIndex: 'year',
            // defaultSortOrder: 'descend',
            // sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Start Month',
            dataIndex: 'startMonth',
        },
        {
            title: 'End Month',
            dataIndex: 'endMonth',
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

export default AcademicSemester;