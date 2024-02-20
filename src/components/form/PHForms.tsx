/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TTFormProps = {
    onSubmit: SubmitHandler<FieldValues>;
    children: ReactNode
} & TFormConfig;

type TFormConfig = {
    defaultValues?: Record<string, any>
    resolver?: any,
}


const PHForms = ({ onSubmit, children, defaultValues, resolver }: TTFormProps) => {
    const formConfigs: TFormConfig = {}
    if (defaultValues) {
        formConfigs["defaultValues"] = defaultValues;
    }
    if (resolver) {
        formConfigs["resolver"] = resolver;
    }
    const methods = useForm(formConfigs)
    return (
        <FormProvider {...methods}>
            <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
                {children}
            </Form>
        </FormProvider >
    );
};

export default PHForms;





