/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row } from "antd";
import PHInput from "../components/form/PHInput";
import PHForms from "../components/form/PHForms";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { TResponse } from "../types";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";


const ChangePassword = () => {

    const [changePassword] = useChangePasswordMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)

        const res = (await changePassword(data) as TResponse<any>)
        if (res?.data?.success) {
            dispatch(logout())
            navigate("/login")
        }
    }

    return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <PHForms onSubmit={onSubmit}>

                <PHInput type="text" name="oldPassword" label="Old Password: " />

                <PHInput type="text" name="newPassword" label="New Password: " />

                <Button htmlType="submit">Login</Button>
            </PHForms>
        </Row>
    );
};

export default ChangePassword;