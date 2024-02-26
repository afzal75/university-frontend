import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRoute = {
    children: ReactNode;
    role: string | undefined
}

const ProtectedRoutes = ({ children, role }: TProtectedRoute) => {
    const token = useAppSelector(useCurrentToken);

    let user;

    if (token) {
        user = verifyToken(token)
    }
    console.log(user)

    const dispatch = useAppDispatch()

    // const user = useAppSelector(selectCurrentUser)
    if (role !== undefined && role !== user?.role) {
        dispatch(logout())
        return <Navigate to="/login" replace={true} />
    }

    if (!token) {
        return <Navigate to="/login" replace={true} />
    }



    return children
};

export default ProtectedRoutes;