import { Form, Select } from "antd";
import React, { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TPHSelectProps = {
    label: string;
    name: string;
    disabled?: boolean;
    options: {
        value: string, label:
        string, disabled?: boolean
    }[] | undefined
    mode?: "multiple" | undefined;
    onValueChange: React.Dispatch<React.SetStateAction<string>>

}

const PHSelectWithWatch = ({
    label, name, options, disabled, mode, onValueChange
}: TPHSelectProps) => {

    const { control } = useFormContext()
    const inputValue = useWatch({
        control,
        name
    })
    useEffect(() => {
        onValueChange(inputValue)
    }, [inputValue])
    console.log(inputValue)

    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Form.Item label={label}>
                    <Select
                        mode={mode}
                        style={{ width: "100%" }}
                        {...field}
                        options={options}
                        disabled={disabled}
                        // onValueChange={onValueChange}
                        size="large"
                    />
                    {error && <small style={{ color: "red" }}>{error.message}</small>}
                </Form.Item>
            )}
        />


    );
};

export default PHSelectWithWatch;