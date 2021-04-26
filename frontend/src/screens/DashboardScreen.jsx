import { useSelector } from "react-redux";
import UserList from "../components/user-list/UserList";
import { Link } from "react-router-dom";

const DashboardScreen = (props) => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const manager = userInfo ? userInfo.user.role === 'manager' : false;

    if (!userInfo) {
        props.history.push('/login')
    } else if (!manager) {
        props.history.push('/')
    }

    return (
        <div>
            <h1 className="no-margin">Dashboard</h1>
            <Link to="/create" className="subheader-link">Create a new user</Link>
            <UserList />
        </div>
    )

}

export default DashboardScreen;