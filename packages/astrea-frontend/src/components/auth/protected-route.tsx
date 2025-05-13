import {Navigate, Outlet} from "react-router-dom";
import {useSession} from "../../hooks/useAuth"; // path to your React Query hook

const ProtectedRoute = () => {
    const {data, error, isLoading} = useSession();

    console.log(data);

    if (isLoading) return <div></div>;
    if (error || !data?.user) return <Navigate to="/auth/sign-in"/>;

    return <Outlet/>;
};

export default ProtectedRoute;
