/* eslint-disable @typescript-eslint/no-explicit-any */
export type TCourse = {
    _id: string;
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses: any[];
    isDeleted: boolean;
    __v: number;
};