import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/userActions";
import { USER_REGISTER_RESET } from "../../redux/constants/userConstants";
import Button from "../button/Button";
import Loading from "../loading/Loading";
import MessageBox from "../message-box/MessageBox";
// import Select from "../select/Select";
import TextInput from "../text-input/TextInput";

const UserRegister = ({parentProps}) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [createdUser, setCreatedUser] = useState('');

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, success } = userRegister;

    const dispatch = useDispatch();

    useEffect(() => {
        if (success) {
            dispatch({type: USER_REGISTER_RESET})
        }
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!')
        } else {
            dispatch(register(firstName, lastName, email, role, password))
            setCreatedUser(`${firstName} ${lastName} was created!`)
            setFirstName('')
            setLastName('')
            setEmail('')
            setRole('')
            setPassword('')
            setConfirmPassword('')
        }
    }

    return (
        <div>
            {loading && <Loading />}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            {success && <MessageBox variant="success">{createdUser}</MessageBox>}
            <div className="component-container">
                <form onSubmit={handleSubmit}>
                    <TextInput 
                        label="First name" 
                        name="firstName" 
                        id="firstName" 
                        value={firstName} 
                        required={true} 
                        onChange={(e) => setFirstName(e.target.value)} />
                    
                    <TextInput 
                        label="Last name" 
                        name="lastName" 
                        id="lastName" 
                        value={lastName} 
                        required={true} 
                        onChange={(e) => setLastName(e.target.value)} />
                    
                    <TextInput 
                        label="Email address" 
                        type="email"
                        name="email" 
                        id="email" 
                        value={email} 
                        required={true} 
                        onChange={(e) => setEmail(e.target.value)} />
                    
                    {/* <Select label="Role"/> */}
                    
                    <label htmlFor="role">User role</label>
                    <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="">Select role...</option>
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                    </select>

                    <TextInput 
                        label="Password" 
                        type="password"
                        name="password" 
                        id="password" 
                        value={password} 
                        required={true} 
                        onChange={(e) => setPassword(e.target.value)} />
                    
                    <TextInput 
                        label="Confirm password" 
                        type="password"
                        name="confirmPassword" 
                        id="confirmPassword" 
                        value={confirmPassword} 
                        required={true} 
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                    
                    {/* <button className="btn" type="submit">Create user</button> */}
                    <Button type="submit" value="Create user" variant="btn--primary--solid" size="btn--medium"/>
                </form>
            </div>
        </div>
    )
}

export default UserRegister;