import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminPaths } from "./admin.routes";
import { routeGenerator } from "../utils/routesGenarator";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";
import ProtectedRoutes from "../components/layout/ProtectedRoutes";
import ChangePassword from "../pages/ChangePassword";
// import { adminPaths } from "./admin.routes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/admin",
        element: <ProtectedRoutes role="admin">
            <App />
        </ProtectedRoutes>,
        children: routeGenerator(adminPaths),
    },
    {
        path: "/faculty",
        element: <ProtectedRoutes role="faculty">
            <App />
        </ProtectedRoutes>,
        children: routeGenerator(facultyPaths),
    },
    {
        path: "/student",
        element: <ProtectedRoutes role="student">
            <App />
        </ProtectedRoutes>,
        children: routeGenerator(studentPaths),
    },

    {
        path: "/change-password",
        element: <ChangePassword />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
])

export default router;