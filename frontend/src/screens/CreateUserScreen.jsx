import { useSelector } from "react-redux";
import UserRegister from "../components/create-user/CreateUser"

const UserRegisterScreen = (props) => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const manager = userInfo ? userInfo.user.role === 'manager' : false;

    if (!userInfo) props.history.push('/login')
    if (!manager) props.history.push('/')

    return (
        <div>
            <h1>Create a new user</h1>
            <UserRegister parentProps={props} />
        </div>
    )
}

export default UserRegisterScreen;