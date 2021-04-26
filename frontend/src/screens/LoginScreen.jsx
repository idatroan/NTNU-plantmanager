import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import Loading from "../components/loading/Loading";
import MessageBox from "../components/message-box/MessageBox";
import TextInput from "../components/text-input/TextInput";
import Button from "../components/button/Button";

const LoginScreen = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [userInfo, props.history, redirect])

    return (
        <div>
            <h1>Login</h1>
            <div className="component-container">
                {loading && <Loading/>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <form onSubmit={handleSubmit}>
                    <TextInput 
                        label="Email address" 
                        type="email"
                        name="email" 
                        id="email" 
                        value={email} 
                        required={true} 
                        onChange={(e) => setEmail(e.target.value)} />

                    <TextInput 
                        label="Password" 
                        type="password"
                        name="password" 
                        id="password" 
                        value={password} 
                        required={true} 
                        onChange={(e) => setPassword(e.target.value)} />
                    
                    <Button type="submit" value="Log in" variant="btn--primary--solid" size="btn--medium"/>
                </form>
                <Link className="margin-top" to="/forgot">Forgot Password?</Link>
                <br/>
                <Link className="margin-top" to="/register">Don't have an account? Register here</Link>
            </div>
        </div>
    )
}

export default LoginScreen;