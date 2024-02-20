import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useState } from "react";


export type TTableData = Pick<TAcademicSemester, "_id" | "name" | "year" | "startMonth" | "endMonth">

const AcademicSemester = () => {
    const [params, setParams] = useState([])

    const { data: semesterData } = useGetAllSemestersQuery(params)

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
            // filters: [
            //     {
            //         text: 'Year',
            //         value: 'London',
            //     },
            //     {
            //         text: 'New York',
            //         value: 'New York',
            //     },
            // ]
        },
        {
            title: 'End Month',
            dataIndex: 'endMonth',
            // filters: [
            //     {
            //         text: 'Year',
            //         value: 'London',
            //     },
            //     {
            //         text: 'New York',
            //         value: 'New York',
            //     },
            // ]
        },
    ];

    const onChange: TableProps<TTableData>['onChange'] = (pagination, filters, sorter, extra) => {
        if (extra.action === "filter") {
            const queryParams = [];

            filters.name?.forEach((item) =>
                queryParams.push({ name: "name", value: item })
            )
            setParams(queryParams)
        }
    };

    console.log(semesterData)

    return (
        <div>
            <Table columns={columns} dataSource={tableData} onChange={onChange} />
            {/* <h1>Academic Semester</h1> */}
        </div>
    );
};

export default AcademicSemester;