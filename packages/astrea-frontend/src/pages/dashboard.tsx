import {useUser} from "../context/user-context.tsx";

function Dashboard() {
    const {signOut, user} = useUser();
    return (
        <div>
            <button onClick={signOut}>Log out</button>
            <p>{user?.username}</p>
            <p>{user?.level}</p>
            <p>{user?.exp}</p>
        </div>
    );
}

export default Dashboard;