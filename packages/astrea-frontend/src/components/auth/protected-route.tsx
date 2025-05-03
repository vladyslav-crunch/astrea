import {Navigate, Outlet} from "react-router-dom";
import {useUser} from "../../context/user-context";

const ProtectedRoute = () => {
    const {isAuthenticated, loading} = useUser();
    if (loading) return <div>Loading...</div>;
    if (!isAuthenticated) return <Navigate to="/auth/sign-in"/>;

    return <Outlet/>;
};

export default ProtectedRoute;
